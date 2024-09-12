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

    console.log('PaymentSystem deployed to:', contractAddress);
    console.log('Initial fee percentage:', initialFeePercentage / 100, '%');

    const frontendContractFile = path.join(__dirname, '../../webapp/constants/contract.ts');
    console.log('Attempting to update file:', frontendContractFile);

    // Read the current content of the file
    let content = await fs.readFile(frontendContractFile, 'utf8');
    console.log('File content read successfully');

    // Replace the contract address
    const oldContent = content;
    content = content.replace(
      /export const contractAddress = '.*'/,
      `export const contractAddress = "${contractAddress}"`,
    );
    console.log('content', content);

    // Add or update the initial fee percentage
    if (content.includes('export const initialFeePercentage')) {
      content = content.replace(
        /export const initialFeePercentage = .*/,
        `export const initialFeePercentage = ${initialFeePercentage}`,
      );
    } else {
      content += `\nexport const initialFeePercentage = ${initialFeePercentage};\n`;
    }

    // Only write to the file if changes were made
    if (content !== oldContent) {
      // Write the updated content back to the file
      console.log('content', content);

      await fs.writeFile(frontendContractFile, content);
      console.log(`Contract address and initial fee percentage updated in ${frontendContractFile}`);
    } else {
      console.log('No changes were necessary in the frontend contract file');
    }

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
