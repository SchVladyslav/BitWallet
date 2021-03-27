import { Currency } from './WalletType.interface';

export interface Blockchain {
	chain: Chain[];
	difficulty: number;
	pendingTransactions: Transaction[];
	miningReward: number;
}

export interface Chain {
	previousHash: string;
	timestamp: Date;
	transactions: Transaction[];
	hash: string;
	nonce: number;
}

export interface Transaction {
	fromAddress: string;
	toAddress: string;
	amount: number;
	currency: Currency
}
