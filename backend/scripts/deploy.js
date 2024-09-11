const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
    const PaymentSystem = await hre.ethers.getContractFactory("PaymentSystem");
    const paymentSystem = await PaymentSystem.deploy();

    const contractAddress = await paymentSystem.getAddress()

    console.log("PaymentSystem deployed to:", contractAddress);


    const frontendContractFile = path.join(__dirname, '../../webapp/constants/contract.ts');

    // Read the current content of the file
    let content = fs.readFileSync(frontendContractFile, 'utf8');

    // Replace the contract address
    content = content.replace(
        /export const contractAddress = ".*"/,
        `export const contractAddress = "${contractAddress}"`
    );

    // Write the updated content back to the file
    fs.writeFileSync(frontendContractFile, content);

    console.log(`Contract address updated in ${frontendContractFile}`);

    // Copy the ABI
    const sourcePath = path.join(__dirname, '../artifacts/contracts');
    const destPath = path.join(__dirname, '../../webapp/constants/artifacts');

    fs.cpSync(sourcePath, destPath, { recursive: true });

    console.log(`Artifacts copied to ${destPath}`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});