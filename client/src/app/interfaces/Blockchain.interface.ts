export interface Blockchain {
	chain: Chain[];
	difficulty: number;
	pendingTransactions: Transaction[];
	miningReward: number;
}

export interface Chain {
	previousHash: string;
	timestamp: Date;
	transactions: any[];
	hash: string;
	nonce: number;
}

export interface Transaction {
	fromAddress: string;
	toAddress: string;
	amount: number;
}
