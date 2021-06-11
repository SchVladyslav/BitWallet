import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICurrencyConfig } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from '../../../services/blockchain/blockchain.service'
import { AbstractPageDirective } from '../../abstract-page/abstract-page.directive';
import { CurrencyConfig } from '../../../helpers/currency.config';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';

@Component({
  selector: 'app-currency-layout',
  templateUrl: './currency-layout.component.html',
  styleUrls: ['./currency-layout.component.scss']
})
export class CurrencyLayoutComponent extends AbstractPageDirective implements OnInit {

  public currentCurrencyConfig: ICurrencyConfig;
  // public currencyName: string;
  public currencyPrice: number;
  public currencyChange: number;

  constructor(
    private blockchainService: BlockchainService,
    private coinMarketCupService: CoinMarketCupService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    // this.currencyName = this.router.url.slice(1).toUpperCase();
    this.setCurrentCurrencyName();
    this.currencyPrice = this.coinMarketCupService.coinCup[this.currencyName].price;
    this.currencyChange = this.coinMarketCupService.coinCup[this.currencyName].change;
  }

  private setCurrentCurrencyName(): void {
    this.currentCurrencyConfig = CurrencyConfig[this.currencyName];
  }

  get balance(): number {
    return this.blockchainService.getBalanceByCurrency(this.currencyName);
  }
  
  get currencyName(): string {
    return this.router.url.slice(1).toUpperCase();
  }
}
