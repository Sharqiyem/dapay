const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PaymentSystem", function () {
    let PaymentSystem;
    let contract;
    let owner, addr1, addr2;

    beforeEach(async function () {
        PaymentSystem = await ethers.getContractFactory("PaymentSystem");
        contract = await PaymentSystem.deploy();
        [owner, addr1, addr2] = await ethers.getSigners();
    });

    it("should allow users to deposit and update balances", async function () {
        await contract.connect(addr1).deposit({ value: ethers.parseEther("1.0") });
        const balance = await contract.getBalance(addr1.address);
        expect(balance).to.equal(ethers.parseEther("1.0"));
    });

    it("should allow users to withdraw funds", async function () {
        await contract.connect(addr1).deposit({ value: ethers.parseEther("2.0") });
        await contract.connect(addr1).withdraw(ethers.parseEther("1.0"));
        const balance = await contract.getBalance(addr1.address);
        expect(balance).to.equal(ethers.parseEther("1.0"));
    });

    it("should allow setting and retrieving usernames", async function () {
        await contract.connect(addr1).setUsername("Alice");
        const username = await contract.getUsername(addr1.address);
        expect(username).to.equal("Alice");
    });

    it("should allow sending payments", async function () {
        await contract.connect(addr1).deposit({ value: ethers.parseEther("2.0") });
        await contract.connect(addr1).sendPayment(addr2.address, ethers.parseEther("1.0"), "Payment for services");
        const addr2Balance = await contract.getBalance(addr2.address);
        expect(addr2Balance).to.equal(ethers.parseEther("1.0"));
    });

    it("should allow requesting payments", async function () {
        await contract.connect(addr1).requestPayment(addr2.address, ethers.parseEther("1.0"), "Request for services");
        const transactions = await contract.getTransactions();
        expect(transactions.length).to.equal(1);
        expect(transactions[0].isRequest).to.be.true;
    });
});