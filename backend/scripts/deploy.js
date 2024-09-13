const fs = require('fs').promises;
const path = require('path');
const hre = require('hardhat');

async function main() {
  try {
    const initialFeePercentage = 100; // 1% fee, adjust as needed

    const PaymentSystem = await hre.ethers.getContractFactory('PaymentSystem');
    const paymentSystem = await PaymentSystem.deploy(initialFeePercentage);

    await paymentSystem.waitForDeployment();
    const contractAddress = await paymentSystem.getAddress();

    // Get the network name
    const networkName = hre.network.name;

    console.log(`PaymentSystem deployed to: ${contractAddress} on network: ${networkName}`);
    console.log('Initial fee percentage:', initialFeePercentage / 100, '%');

    const frontendContractFile = path.join(__dirname, '../../webapp/constants/contract.ts');

    // Read the current content of the file
    let content = await fs.readFile(frontendContractFile, 'utf8');

    // Find the CONTRACT_ADDRESSES object in the content
    const contractAddressesRegex = /export const CONTRACT_ADDRESSES: \{ \[key: string\]: string \} = {[\s\S]*?};/;
    const match = content.match(contractAddressesRegex);

    if (!match) {
      throw new Error('Could not find CONTRACT_ADDRESSES in the file');
    }

    let updatedAddresses = match[0];

    // Check if the network already exists in the object
    const networkRegex = new RegExp(`(\\s+${networkName}:\\s*)'[^']+'`, 'g');
    if (networkRegex.test(updatedAddresses)) {
      // If the network exists, update its address
      updatedAddresses = updatedAddresses.replace(networkRegex, `$1'${contractAddress}'`);
    } else {
      // If the network doesn't exist, add it to the object
      updatedAddresses = updatedAddresses.replace(
        /}\s*;/,
        `,\n    ${networkName}: '${contractAddress}'\n};`
      );
    }

    // Replace the old CONTRACT_ADDRESSES object with the updated one
    content = content.replace(contractAddressesRegex, updatedAddresses);

    // Write the updated content back to the file
    await fs.writeFile(frontendContractFile, content);

    console.log(`Contract address updated for network ${networkName} in ${frontendContractFile}`);

    // Copy the ABI
    const sourcePath = path.join(__dirname, '../artifacts/contracts');
    const destPath = path.join(__dirname, '../../webapp/constants/artifacts');

    await fs.cp(sourcePath, destPath, { recursive: true });

    console.log(`Artifacts copied to ${destPath}`);

  } catch (error) {
    console.error('An error occurred during deployment or file update:', error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
