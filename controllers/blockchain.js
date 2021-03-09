const errorHandler = require('../utils/errorHandler');
const statuses = require('../helper/statuses');
const { Blockchain, Transaction } = require('./blockchain/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const key = ec.genKeyPair();
let coin = new Blockchain();
let newTransaction = new Transaction();

module.exports.keys = async function (req, res) {
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

module.exports.blockchain = async function (req, res) {
	try {
		res.status(statuses.createdStatus).json(coin);
	} catch (error) {
		errorHandler(res, error);
	}
}

module.exports.transaction = async function (req, res) {
	newTransaction.fromAddress = key.getPublic('hex');
	newTransaction.toAddress = req.body.toAddress;
	newTransaction.amount = req.body.amount;
	newTransaction.signTransaction(key);
	coin.addTransaction(newTransaction);
	try {
		res.status(statuses.createdStatus).json(newTransaction);
	} catch (error) {
		errorHandler(res, error);
	}
}

module.exports.pendingTransactions = async function (req, res) {
	let pendingTransactions = coin.pendingTransactions;
	try {
		res.status(statuses.createdStatus).json(pendingTransactions);
	} catch (error) {
		errorHandler(res, error);
	}
}

module.exports.mine = async function (req, res) {
	try {
		res.status(statuses.createdStatus).json(coin.minePendingTransactions(key.getPublic('hex')));
	} catch (error) {
		errorHandler(res, error);
	}
}

module.exports.balance = async function (req, res) {
	try {
		res.status(statuses.createdStatus).json(coin.getBalanceOfAddress(key.getPublic('hex')));
	} catch (error) {
		errorHandler(res, error);
	}
}
