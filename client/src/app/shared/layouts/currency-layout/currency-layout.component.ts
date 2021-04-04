import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ICurrencyConfig } from 'src/app/interfaces/WalletType.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { BlockchainService } from '../../../services/blockchain/blockchain.service'
import { AbstractPageDirective } from '../../abstract-page/abstract-page.directive';
import { CurrencyConfig } from '../../../helpers/currency.config';

@Component({
  selector: 'app-currency-layout',
  templateUrl: './currency-layout.component.html',
  styleUrls: ['./currency-layout.component.scss']
})
export class CurrencyLayoutComponent extends AbstractPageDirective implements OnInit {

  public currentCurrencyConfig: ICurrencyConfig;
  private currencyName: string;

  constructor(
    private blockchainService: BlockchainService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.currencyName = this.router.url.slice(1).toUpperCase();
    this.setCurrentCurrencyName();
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
        // this.spinner.hide();
        // this.notificationService.show(error.error.message, 'error');
    //   }
    // )
  }

  private setCurrentCurrencyName(): void {
    this.currentCurrencyConfig = CurrencyConfig[this.currencyName];
  }

  get balance(): number {
    return this.blockchainService.getBalanceByCurrency(this.currencyName);
  }

}
