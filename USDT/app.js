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
