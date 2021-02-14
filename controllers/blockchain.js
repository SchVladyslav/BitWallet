const errorHandler = require('../utils/errorHandler');
const statuses = require('../helper/statuses');
const { Blockchain, Transaction } = require('./blockchain');
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