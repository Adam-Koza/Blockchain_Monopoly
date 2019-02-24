const mongoose = require('mongoose');

const server = 'ds153495.mlab.com:53495';
const dbName = 'monopolydb';
const user = 'monopolyuser';
const p = 'blockchainmonopoly19';

const connectionString = `mongodb://${user}:${p}@${server}/${dbName}`;


const connect = () => {
	mongoose.connect(connectionString)
		.then(() => { console.log(`Connected to mongodb at : ${connectionString}`)})
		.catch(err => { console.log(err)});
};

module.exports = connect;
