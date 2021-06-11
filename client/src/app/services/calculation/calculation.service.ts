import { Injectable } from '@angular/core';
import { CalculationsUtils } from 'src/app/components/utils/calculations/CalculationsUtils';
import { CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { BlockchainService } from '../blockchain/blockchain.service';
import { CoinMarketCupService } from '../coinmarketcup/coinmarketcup.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private blockchainService: BlockchainService, private coinMarketCupService: CoinMarketCupService) { }

  public calculateBalance(): number {
    let balance: number = 0;
    const balances: number[] = this.blockchainService.getAllCurrenciesBalance();
    const names: string[] = this.blockchainService.getAllCurrenciesNames();
    const coinCup: CoinCupContent = this.coinMarketCupService.coinCup;

    balances.forEach((crypto, index) => {
      balance += CalculationsUtils.convertCryptoInCurrentPrice(crypto, coinCup[names[index]].price);
    });

    return balance;
  }
}
