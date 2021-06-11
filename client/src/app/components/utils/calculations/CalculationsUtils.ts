export class CalculationsUtils {
  static convertCryptoInCurrentPrice(crypto: number, currentPrice: number): number {
    return crypto * currentPrice;
  }

  static convertMoneyIntoCrypto(money: number, currentPrice: number): number {
    return money / currentPrice;
  }

  static convertCryptoIntoMoney(crypto: number, currentPrice: number): number {
    return crypto * currentPrice;
  }
}

