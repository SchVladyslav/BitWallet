import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { CoinContent, CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { Currency } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { NotificationService } from '../../services/notification.service';
import { CalculationsUtils } from '../utils/calculations/CalculationsUtils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractPageDirective implements OnInit {

  public balance: number = 0;
  public currentCrypto: CoinContent;
  public sectionSpinner: string = 'sectionSpinner';
  public calculatedPrice: number[] = [];
  public coinName: string = 'BTC';

  constructor(
    private blockchainService: BlockchainService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private coinMarketCupService: CoinMarketCupService,
  ) {
    super();
    this.blockchainService.balanceSubject.subscribe(() => this.getCryptoCurrencyPrice(Currency.BTC));
  }

  ngOnInit(): void {
    this.getCryptoCurrencyPrice(Currency.BTC);
  }

  private getCryptoCurrencyPrice(coinName: string): void {
    this.spinner.show(this.sectionSpinner);
    this.coinMarketCupService
      .getCurrencyCoinCup()
      .pipe(takeUntil(this.destroy$))
      .subscribe(coinCup => {
        this.currentCrypto = coinCup[coinName];
        this.calculateCryptoCurrentPrice(coinCup);
        this.spinner.hide(this.sectionSpinner);
      },
      (error) => {
        this.spinner.hide(this.sectionSpinner);
        this.notificationService.show(error.error.message, 'error');
      });
  }

  public selectedCrypto(coinName: string): void {
    this.coinName = coinName;
    this.getCryptoCurrencyPrice(coinName);
  }

  private calculateCryptoCurrentPrice(coinCup: CoinCupContent): void {
    const currenciesAmount: number[] = [this.btcBalance, this.ethBalance, this.xrpBalance];
    const currenciesNames: string[] = this.blockchainService.getAllCurrenciesNames();
    this.calculatedPrice = [];
    currenciesAmount.forEach((crypto, i) => {
      this.calculatedPrice.push(CalculationsUtils.convertCryptoInCurrentPrice(crypto, coinCup[currenciesNames[i]].price))
    })
  }

  get btcBalance(): number {
    return this.blockchainService.btcBalance;
  }

  get ethBalance(): number {
    return this.blockchainService.ethBalance;
  }

  get xrpBalance(): number {
    return this.blockchainService.xrpBalance;
  }
}
