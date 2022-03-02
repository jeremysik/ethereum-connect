const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum, 'any') : null;

// Wondering where I got these? Check out README.md.
const basicContract = {
    address:     '0xFe388d60d2974666204aF998097Cbb58224aAe66',
    abiLocation: '/abi/basicContract.abi'
}

function enableButtons() {
    Array.from(document.getElementsByClassName('btn-primary')).forEach((element) => {
        element.disabled = false;
    }); 
}

function disableButtons() {
    Array.from(document.getElementsByClassName('btn-primary')).forEach((element) => {
        element.disabled = true;
    }); 
}

async function connect() {
    if(provider == null)
    {
        alert('Metamask not found!');
        return;
    }

    document.getElementById('output-message').innerHTML = `<p>Please unlock Metamask.</>`;
    disableButtons();

    await provider.send('eth_requestAccounts', []);
    const signer        = provider.getSigner();
    const signerAddress = await signer.getAddress();

    document.getElementById('output-message').innerHTML = `<p>Connected!</p><p>Your wallet address: ${signerAddress}</>`;
    enableButtons();
}

async function mint10ETC() {
    if(provider == null)
    {
        alert('Metamask not found!');
        return;
    }

    // Get ABI
    const res  = await fetch(basicContract.abiLocation);
    const data = await res.text();
    const abi  = JSON.parse(data);

    document.getElementById('output-message').innerHTML = `<p>Please unlock Metamask.</>`;
    disableButtons();

    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    document.getElementById('output-message').innerHTML = `<p>Please confirm transaction.</p>`;

    // Init contract
    const contract = new ethers.Contract(basicContract.address, abi, signer);
    const options  = {};

    // Run contract
    const tx = await contract.mint(options);

    document.getElementById('output-message').innerHTML += `<p>Transaction hash: ${tx.hash} (view on <a target="_blank" href="https://ropsten.etherscan.io/tx/${tx.hash}">Etherscan</a>)</p>`;
    document.getElementById('output-message').innerHTML += `<p>Waiting for confirmation...</p>`;

    const receipt  = await tx.wait();
    document.getElementById('output-message').innerHTML += `<p>Transaction confirmed in block: ${receipt.blockNumber}</p>`;
    document.getElementById('output-message').innerHTML += `<p>10ETC has been minted to your wallet!</p>`;

    enableButtons();
}

async function totalSupply() {
    if(provider == null)
    {
        alert('Metamask not found!');
        return;
    }

    // Get ABI
    const res  = await fetch(basicContract.abiLocation);
    const data = await res.text();
    const abi  = JSON.parse(data);

    document.getElementById('output-message').innerHTML = `<p>Please unlock Metamask.</>`;
    disableButtons();

    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    // Init contract
    const contract = new ethers.Contract(basicContract.address, abi, signer);
    const options  = {};

    // Run contract
    let totalSupply = await contract.totalSupply(options);

    document.getElementById('output-message').innerHTML = `<p>The total supply is ${totalSupply / 10**18}ETC.</p>`;

    enableButtons();
}