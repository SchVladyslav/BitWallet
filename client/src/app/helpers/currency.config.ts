import { Currency } from '../interfaces/WalletType.interface';

export const CurrencyConfig = {
  'BTC': {
    name: "Bitcoin",
    ticker: Currency.BTC,
    description: "Bitcoin (BTC) is the original crypto and the internet's digital currency.",
    img: "../../../../assets/icons/svg/icon-Bitcoin.svg"
  },
  'ETH': {
    name: "Ethereum",
    ticker: Currency.ETH,
    description: "Ethereum (ETH) is the original crypto and the internet's digital currency.",
    img: "../../../../assets/icons/svg/icon-Ethereum.svg"
  },
  'XRP': {
    name: "Ripple",
    ticker: Currency.XRP,
    description: "Ripple (XRP) is the original crypto and the internet's digital currency.",
    img: "../../../../assets/icons/svg/icon-Xrp.svg"
  }
}