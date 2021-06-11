export interface CoinCupData {
	data: CoinCup;
}

export interface CoinCupContent {
	BTC: CoinContent,
	ETH: CoinContent,
	XRP: CoinContent
}

export interface CoinContent {
	name: string,
	symbol: string,
	price: number,
	change: number
}

export interface CoinCup {
	BTC: Coin[];
	ETH: Coin[];
	XRP: Coin[];
}

interface Coin {
	name: string;
	symbol: string;
	quote: Currency;
}

interface Currency {
	USD: Quote;
}

interface Quote {
	price: number;
	percent_change_7d: number;
	percent_change_24h: number;
	percent_change_30d: number;
}