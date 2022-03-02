const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum, 'any') : null;

async function connectMetamask()
{
    await provider.send('eth_requestAccounts', []);
    const signer        = provider.getSigner();
    const signerAddress = await signer.getAddress();

    document.getElementById('output-message').innerHTML = `<p>Connected!</p><p>Your wallet address: ${signerAddress}</>`;
}

function connect() {
    if(provider == null)
    {
        alert('Metamask not found!');
        return;
    }

    document.getElementById('output-message').innerHTML = `<p>Please unlock Metamask.</>`;

    connectMetamask();
}