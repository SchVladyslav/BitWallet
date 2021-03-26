export enum WalletType {
    BTC = 'My Bitcoin Wallet',
    ETH = 'My Ethereum Wallet',
    XRP = 'My XRP Wallet',
}

export enum Currency {
    BTC = 'BTC',
    ETH = 'ETH',
    XRP = 'XRP'
}

export interface ICurrencyConfig {
    name: string;
    ticker: string;
    description: string;
    img: string;
}