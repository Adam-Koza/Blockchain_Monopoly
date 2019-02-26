//import EmbarkJS from 'Embark/EmbarkJS';

// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

const ethers = require('ethers');
const Monopoly = require('../../dist/contracts/Monopoly.json');

const provider = new ethers.providers.JsonRpcProvider("");

let nonce = 50;

async function listAccounts() {
    // let accounts = await provider.listAccounts();
    // console.log("Provider:");
    // console.log(provider.connection);
    // console.log("");
    // console.log("Accounts:")
    // console.log(accounts);
    // console.log(await deployedContract.newGame(1,10,"Adam"));
}

listAccounts();

// Create a wallet.
let phrase = "certain odor minimum proud east joke hip eternal neck skull sustain chest";
let path = "m/44'/60'/0'/0/";
let wallet = ethers.Wallet.fromMnemonic(phrase).connect(provider);
// console.log(wallet);

let wallet2 = ethers.Wallet.fromMnemonic(phrase, path + "1").connect(provider);
// console.log(wallet2);

let provider2 = new ethers.getDefaultProvider('kovan');
let wallet3 = new ethers.Wallet("0x7aad972cccb4d25ed9b3b01e09ad27bd6b83b362fc7bd5acb9475515f980eeeb", provider2);

const deployedContract = new ethers.Contract(Monopoly['deployedAddress'], Monopoly['abiDefinition'], provider);
const contractWithSigner = new ethers.Contract(Monopoly['deployedAddress'], Monopoly['abiDefinition'], wallet);

// console.log(deployedContract);


async function CallContract() {
    // console.log(await deployedContract.pieceStatus(0,1));
    // console.log(await deployedContract.pieceStatus(1,1));
    // console.log(await deployedContract.pieceStatus(2,1));
    // console.log(await deployedContract.pieceStatus(3,1));
    // console.log(await deployedContract.pieceStatus(4,1));
    // let gameid = await deployedContract.gameID();
    // console.log(gameid.toString());
}

CallContract().catch(function (err) {
    // console.log(err);
});



async function NewGame() {

    let transaction = {
        nonce: await wallet3.getTransactionCount(),
        gasLimit: ethers.utils.bigNumberify("210000"),
        gasPrice: ethers.utils.bigNumberify("20000000000"),

        to: wallet2.address,

        value: ethers.utils.parseEther("0.01"),
    }


    let signPromise = wallet3.sign(transaction);

    console.log("");
    console.log("Transaction");
    console.log("");
    console.log(transaction);
    console.log("");
    console.log("");


    signPromise.then((signedTransaction) => {
        console.log("Signed Transaction");
        console.log("");
        console.log(signedTransaction);
        console.log("");
        console.log("");


        provider2.sendTransaction(signedTransaction).then((tx) => {
            console.log("Sent Transaction");
            console.log("");
            console.log(tx);
            console.log("");
            console.log("");


        });
    });



    // console.log(await contractWithSigner.newGame(1,10,"Adam"));
}

// NewGame().catch(function (err) {
//     // console.log(err);
// });



async function GenInt() {
    console.log((((Date.now() ^ 3)) * ((Date.now() ^ 7))) % 50 );
}

GenInt();
GenInt();
GenInt();
GenInt();
GenInt();
GenInt();


