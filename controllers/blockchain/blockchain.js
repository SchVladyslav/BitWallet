const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
	}

	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
	}

	// You can only send a transaction from the wallet that is linked to your
  // key. So here we check if the fromAddress matches your publicKey
	signTransaction(signingKey) {
		if (signingKey.getPublic('hex') !== this.fromAddress) {
			throw new Error('You cannot sign transaction for other wallets!');
		}

		const hashTx = this.calculateHash();
		const sig = signingKey.sign(hashTx, 'base64');
		this.signature = sig.toDER('hex');
	}

	isValid() {
		if (this.fromAddress === null) return true;
		if (!this.signature || this.signature.length === 0) {
			throw new Error('No signature in this transaction');
		}

		const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
		return publicKey.verify(this.calculateHash(), this.signature);
	}
}

class Block {
	constructor(timestamp, transactions, previousHash = '') {
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.transactions = transactions;
		this.hash = this.calculateHash();
		this.nonce = 0;
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}

	mineBlock(difficulty) {
		while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { // how fast our blocks is added to the blockchain. Amount of zeros before hash 
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log("Block mained: " + this.hash);
	}

	hasValidTransactions() {
		for (const tx of this.transactions) {
			if (!tx.isValid()) {
				return false;
			}
		}

		return true;
	}
}

// In order to forbide regular user of creating new blocks of chain, there is exist
// a mechanism: proof of work or maining.

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions = [];
		this.miningReward = 100;
	}

	createGenesisBlock() {
		return new Block("01/01/2021", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	minePendingTransactions(miningRewardAddress) {
		// const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    // this.pendingTransactions.push(rewardTx);
	
		const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log('Block successfully mined!');
		this.chain.push(block);

		this.pendingTransactions = [];
	}

	addTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Transaction must include from and to address');
		}

		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid transaction to chain');
		}

		this.pendingTransactions.push(transaction);
	}

	getBalanceOfAddress(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const trans of block.transactions) {
				if (trans.fromAddress === address) {
					balance -= trans.amount;
				}

				if (trans.toAddress === address) {
					balance += trans.amount;
				}
			}
		}

		return balance;
	}

	// addBlock(newBlock) {
	// 	newBlock.previousHash = this.getLatestBlock().hash;
	// 	newBlock.mineBlock(this.difficulty);
	// 	this.chain.push(newBlock);
	// }

	isChainValid() { // proof of work
		for (let i = 1; i < this.chain.length; i++) { // from i = 1, cause [0] is Genesis
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (!currentBlock.hasValidTransactions()) {
				return false;
			}

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
