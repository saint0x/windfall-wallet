// test.js

// Import necessary dependencies
const Web3 = require('web3');
const WalletFactoryContract = require('./build/contracts/WalletFactory.json');
const OwnershipContract = require('./build/contracts/Ownership.json');

// Set up Web3 instance (assuming Ganache is running locally on port 8545)
const web3 = new Web3('http://localhost:8545');

// Set up contract instances
const walletFactory = new web3.eth.Contract(WalletFactoryContract.abi, WalletFactoryContract.networks['5777'].address); // Update with your Ganache network ID
const ownership = new web3.eth.Contract(OwnershipContract.abi, OwnershipContract.networks['5777'].address); // Update with your Ganache network ID

// Sample input data
const owners = [
    '0x62f03E531cBfBd3CC4056F32A6E16B845A4a82E7', 
    '0x25A894a3d611693F675752cd73bA79Fe8E5e58F1', 
    '0xFF3dB147fF9FA501fA3D53f521dF25A703bCcAB1'
]; // Addresses of owners
const numConfirmationsRequired = 2; // Number of confirmations required

// Emojis for logging
const successEmoji = '✅';
const errorEmoji = '❌';

// Test functions
const testWalletCreation = async () => {
    try {
        const receipt = await walletFactory.methods.createWallet().send({ from: owners[0] });
        console.log(successEmoji, 'Wallet created:', receipt.events.WalletCreated.returnValues.wallet);
    } catch (error) {
        console.error(errorEmoji, 'Error creating wallet:', error);
    }
};

const testOwnershipTransfer = async () => {
    try {
        const receipt = await ownership.methods.transferOwnership(owners[1]).send({ from: owners[0] });
        console.log(successEmoji, 'Ownership transferred successfully');
    } catch (error) {
        console.error(errorEmoji, 'Error transferring ownership:', error);
    }
};

// Run tests
const runTests = async () => {
    console.log('Starting tests...');

    console.log('Creating wallet...');
    await testWalletCreation();

    console.log('Transferring ownership...');
    await testOwnershipTransfer();

    console.log('Tests completed');
};

runTests();
