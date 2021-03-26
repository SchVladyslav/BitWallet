import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractPageDirective implements OnInit {

  public balance: number = 0;

  constructor(
    private blockchainService: BlockchainService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {
    super()
  }

  ngOnInit(): void {
    this.getBalance();
  }

  private getBalance(): void {
    this.spinner.show();
    this.blockchainService.balanceSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(balance => {
        this.balance = balance;
        this.spinner.hide();
      },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }

}
