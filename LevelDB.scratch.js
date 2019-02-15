const levelup = require('levelup');
const leveldown = require('leveldown');
const ethers = require('ethers');

const { solidityKeccak256 } = ethers.utils;

const db = levelup(leveldown('./mydb'))


const main = async () => {

    const storageKey = solidityKeccak256(['string', 'uint8'], ["App1", 0]);

    await db.put(storageKey, "some string to store");

    const valueFromDB = await db.get(storageKey, ["App1", 0]);
    console.log(valueFromDB.toString());

    await db.del(storageKey, ["App1", 0]);


    let userType = ["tuple(uint256,uint8)"];
    let inputData = [ // AbiCoder wraps all of the data.
    
        [ // User tuple.
          555, // uint256 representing `id`.
          200,   // uint256 representing `permission`.
        ]
    
    ];
    
    let encodedData = ethers.utils.defaultAbiCoder.encode(userType, inputData);

    await db.put(storageKey, encodedData);

    const encodedFromStore = await db.get(storageKey);
    console.log(`Encoded format: ${encodedFromStore.toString()}`);
    console.log(`Decoded format: ${ethers.utils.defaultAbiCoder.decode(userType, encodedFromStore.toString())}`);
}

main();