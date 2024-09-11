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

  beforeEach(async function () {
    PaymentSystem = await ethers.getContractFactory('PaymentSystem');
    [owner, addr1, addr2] = await ethers.getSigners();
    paymentSystem = await PaymentSystem.deploy();
    await paymentSystem.waitForDeployment();
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
    it('Should send payment correctly', async function () {
      const amount = ethers.parseEther('1');
      await expect(paymentSystem.connect(addr1).sendPayment(addr2.address, 'Test payment', { value: amount }))
        .to.emit(paymentSystem, 'PaymentSent')
        .withArgs(addr1.address, addr2.address, amount, 'Test payment', anyValue);
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
});
