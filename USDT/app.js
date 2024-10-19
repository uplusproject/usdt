window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask detected');

        const connectWalletButton = document.getElementById('connectWallet');
        connectWalletButton.addEventListener('click', async () => {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const userAccount = accounts[0];

                document.getElementById('walletAddress').textContent = userAccount;
                document.getElementById('walletInfo').classList.remove('hidden');
                document.getElementById('status').textContent = 'Connected: ' + userAccount;

                console.log('Wallet connected:', userAccount);
            } catch (error) {
                console.error('Error connecting wallet:', error);
                document.getElementById('status').textContent = 'Failed to connect wallet.';
            }
        });
    } else {
        alert('MetaMask is not installed. Please install MetaMask to use this DApp.');
    }
});
