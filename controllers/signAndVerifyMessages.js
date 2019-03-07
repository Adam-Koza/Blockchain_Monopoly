let ethers = require('ethers');

// Starter provided by: https://docs.ethers.io/ethers.js/html/cookbook-signing.html?highlight=message#signing-a-string-message

let abi = [
    "function verifyString(string, uint8, bytes32, bytes32) public pure returns (address)"
];

let provider = ethers.getDefaultProvider('ropsten');

// Create a wallet to sign the message with
let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123';
let wallet = new ethers.Wallet(privateKey);

console.log(wallet.address);
// "0x14791697260E4c9A71f18484C9f997B308e59325"

let contractAddress = '0x80F85dA065115F576F1fbe5E14285dA51ea39260';
let contract = new ethers.Contract(contractAddress, abi, provider);


async function signMessage(message) {
    // Sign the string message
    let flatSig = await wallet.signMessage(message);

    // For Solidity, we need the expanded-format of a signature
    let sig = ethers.utils.splitSignature(flatSig);

    // Post request to server with sig as body.
    return [message, sig];
}

async function verifyMessage(message, sig, address) {
    // Call the verifyString function (blockchain).
    let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);
    console.log(recovered);
    return recovered == address;
}

// Test - expected True.
signMessage("roll kjdsdfhjsdkfhsduhfuinewf").then(sig => {
    verifyMessage("roll kjdsdfhjsdkfhsduhfuinewf", sig[1], "0x14791697260E4c9A71f18484C9f997B308e59325").then(console.log)
})

// Test - expected False.
signMessage("roll kjdsdfhjsdkfhsduhfuinewf").then(sig => {
    verifyMessage("roll kjdsdfhjsdkfhsduhfuinew", sig[1], "0x14791697260E4c9A71f18484C9f997B308e59325").then(console.log)
})

