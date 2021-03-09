export interface CoinCupContent {
	data: CoinCup;
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