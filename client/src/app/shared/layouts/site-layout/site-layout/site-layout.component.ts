import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { RequestModalComponent } from 'src/app/components/modal/request-modal/request-modal.component';
import { SendModalComponent } from 'src/app/components/modal/send-modal/send-modal.component';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { NavigationList } from '../../../../interfaces/NavigationList';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent extends AbstractPageDirective implements OnInit {

  public balance: number = 0;
  public spinnerName: string = 'asideSpinner';
  bsModalRef: BsModalRef;

  links: NavigationList[] = [
    { url: '/dashboard', name: 'Dashboard', ticker: 'dashboard', img: '../../../assets/icons/svg/icon-dashboard.svg' },
    { url: '/btc', name: 'Bitcoin', ticker: 'btc', img: '../../../assets/icons/svg/icon-Bitcoin.svg' },
    { url: '/eth', name: 'Ether', ticker: 'eth', img: '../../../assets/icons/svg/icon-Ethereum.svg' },
    { url: '/xrp', name: 'Ripple', ticker: 'xrp', img: '../../../assets/icons/svg/icon-Xrp.svg' },
  ];

  constructor(
    private modalService: BsModalService,
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
    this.spinner.show(this.spinnerName);
    this.blockchainService.balanceSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(balance => {
        this.balance = balance;
        this.spinner.hide(this.spinnerName);
        },
        (error) => {
          this.spinner.hide(this.spinnerName);
          this.notificationService.show(error.error.message, 'error');
        });
  }

  public openSendModal(): void {
    this.bsModalRef = this.modalService.show(SendModalComponent);
  }

  public openRequestModal(): void {
    this.bsModalRef = this.modalService.show(RequestModalComponent);
  }
}
