import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { CalculationsUtils } from '../utils/calculations/CalculationsUtils';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent extends AbstractPageDirective implements OnInit {

  private coinCup: CoinCupContent;
  public balance: number = 0;

  constructor(
    private blockchainService: BlockchainService,
    private coinMarketCupService: CoinMarketCupService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCryptoCurrencyPrice();
  }

  public calculateBalance(coinCup: CoinCupContent): number {
    const balances: number[] = this.blockchainService.getAllCurrenciesBalance();
    const names: string[] = this.blockchainService.getAllCurrenciesNames();
    this.balance = 0;

    balances.forEach((crypto, index) => {
      this.balance += CalculationsUtils.convertCryptoInCurrentPrice(crypto, coinCup[names[index]].price);
    });

    return this.balance;
  }

  private getCryptoCurrencyPrice(): void {
    this.spinner.show();
    this.coinMarketCupService
      .getCurrencyCoinCup()
      .pipe(takeUntil(this.destroy$))
      .subscribe(coinCup => {
        this.calculateBalance(coinCup);
        this.spinner.hide();
      },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }
}
