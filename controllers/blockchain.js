const errorHandler = require('../utils/errorHandler');
const statuses = require('../helper/statuses');
const { Blockchain, Transaction } = require('./blockchain/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const key = ec.genKeyPair();

module.exports.keys = function (req, res) {
	const walletKeys = {
		keyObj: key,
		publicKey: key.getPublic('hex'),
		privateKey: key.getPrivate('hex'),
	};
	try {
		res.status(statuses.createdStatus).json(walletKeys);
	} catch (error) {
		errorHandler(res, error);
	}
}

module.exports.blockchain = function (req, res) {
	let coin = new Blockchain();
	console.log('\n Starting the miner...');
	coin.minePendingTransactions(key.getPublic('hex'));
	try {
		res.status(statuses.createdStatus).json(coin);
	} catch (error) {
		errorHandler(res, error);
	}
}