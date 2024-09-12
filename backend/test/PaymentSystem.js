const { time, loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PaymentSystem', function () {
  let PaymentSystem;
  let paymentSystem;
  let owner;
  let addr1;
  let addr2;
  const initialFeePercentage = 100; // 1%

  beforeEach(async function () {
    PaymentSystem = await ethers.getContractFactory('PaymentSystem');
    [owner, addr1, addr2] = await ethers.getSigners();
    paymentSystem = await PaymentSystem.deploy(initialFeePercentage);
    await paymentSystem.waitForDeployment();
  });

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      expect(await paymentSystem.owner()).to.equal(owner.address);
    });

    it('Should set the initial fee percentage', async function () {
      expect(await paymentSystem.feePercentage()).to.equal(initialFeePercentage);
    });
  });

  describe('Username', function () {
    it('Should set and get username correctly', async function () {
      await paymentSystem.connect(addr1).setUsername('Alice');
      expect(await paymentSystem.getUsername(addr1.address)).to.equal('Alice');
    });

    it('Should emit UsernameSet event', async function () {
      await expect(paymentSystem.connect(addr1).setUsername('Alice'))
        .to.emit(paymentSystem, 'UsernameSet')
        .withArgs(addr1.address, 'Alice');
    });
  });

  describe('Payments', function () {
    it('Should send payment correctly and deduct fee', async function () {
      const amount = ethers.parseEther('1');
      const fee = (amount * BigInt(initialFeePercentage)) / BigInt(10000);
      const amountAfterFee = amount - fee;

      await expect(() =>
        paymentSystem.connect(addr1).sendPayment(addr2.address, 'Test payment', { value: amount }),
      ).to.changeEtherBalances([addr1, addr2, paymentSystem], [-amount, amountAfterFee, fee]);

      expect(await paymentSystem.collectedFees()).to.equal(fee);
    });

    it('Should fail if sending 0 ETH', async function () {
      await expect(
        paymentSystem.connect(addr1).sendPayment(addr2.address, 'Test payment', { value: 0 }),
      ).to.be.revertedWith('Amount must be greater than zero');
    });

    it('Should fail if sending to zero address', async function () {
      const amount = ethers.parseEther('1');
      await expect(
        paymentSystem.connect(addr1).sendPayment(ethers.ZeroAddress, 'Test payment', { value: amount }),
      ).to.be.revertedWith('Invalid recipient address');
    });
  });

  describe('Payment Requests', function () {
    it('Should create payment request correctly', async function () {
      const amount = ethers.parseEther('1');
      await expect(paymentSystem.connect(addr1).requestPayment(addr2.address, amount, 'Test request'))
        .to.emit(paymentSystem, 'PaymentRequested')
        .withArgs(addr1.address, addr2.address, amount, 'Test request', anyValue);
    });

    it('Should fail if requesting 0 ETH', async function () {
      await expect(paymentSystem.connect(addr1).requestPayment(addr2.address, 0, 'Test request')).to.be.revertedWith(
        'Amount must be greater than zero',
      );
    });

    it('Should fail if requesting from zero address', async function () {
      const amount = ethers.parseEther('1');
      await expect(
        paymentSystem.connect(addr1).requestPayment(ethers.ZeroAddress, amount, 'Test request'),
      ).to.be.revertedWith('Invalid sender address');
    });
  });

  describe('Transactions', function () {
    it('Should record transactions correctly', async function () {
      const amount = ethers.parseEther('1');
      await paymentSystem.connect(addr1).sendPayment(addr2.address, 'Test payment', { value: amount });
      await paymentSystem.connect(addr2).requestPayment(addr1.address, amount, 'Test request');

      const transactions = await paymentSystem.getTransactions();
      expect(transactions.length).to.equal(2);
      expect(transactions[0].sender).to.equal(addr1.address);
      expect(transactions[0].receiver).to.equal(addr2.address);
      expect(transactions[0].amount).to.equal(amount);
      expect(transactions[0].message).to.equal('Test payment');
      expect(transactions[0].isRequest).to.be.false;

      expect(transactions[1].sender).to.equal(addr2.address);
      expect(transactions[1].receiver).to.equal(addr1.address);
      expect(transactions[1].amount).to.equal(amount);
      expect(transactions[1].message).to.equal('Test request');
      expect(transactions[1].isRequest).to.be.true;
    });
  });

  describe('Fee Management', function () {
    it('Should allow owner to set fee percentage', async function () {
      const newFeePercentage = 200; // 2%
      await expect(paymentSystem.connect(owner).setFeePercentage(newFeePercentage))
        .to.emit(paymentSystem, 'FeePercentageUpdated')
        .withArgs(newFeePercentage);

      expect(await paymentSystem.feePercentage()).to.equal(newFeePercentage);
    });

    it('Should not allow non-owner to set fee percentage', async function () {
      await expect(paymentSystem.connect(addr1).setFeePercentage(200))
        .to.be.revertedWithCustomError(paymentSystem, 'OwnableUnauthorizedAccount')
        .withArgs(addr1.address);
    });

    it('Should not allow setting fee percentage above maximum', async function () {
      const maxFeePercentage = await paymentSystem.MAX_FEE_PERCENTAGE();
      await expect(paymentSystem.connect(owner).setFeePercentage(maxFeePercentage + BigInt(1))).to.be.revertedWith(
        'Fee percentage too high',
      );
    });

    it('Should not allow non-owner to withdraw fees', async function () {
      await expect(paymentSystem.connect(addr1).withdrawFees())
        .to.be.revertedWithCustomError(paymentSystem, 'OwnableUnauthorizedAccount')
        .withArgs(addr1.address);
    });
  });
});
