const hre = require("hardhat");

async function main() {
    const PaymentSystem = await hre.ethers.getContractFactory("PaymentSystem");
    const paymentSystem = await PaymentSystem.deploy();

    // await paymentSystem.deployed();

    // console.log("PaymentSystem deployed to:", paymentSystem.address);
    console.log("PaymentSystem deployed to:", await paymentSystem.getAddress());

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});