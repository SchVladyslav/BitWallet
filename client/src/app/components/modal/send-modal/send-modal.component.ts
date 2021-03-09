import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { Keys } from 'src/app/interfaces/Keys.interface';
import { WalletType } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss']
})
export class SendModalComponent extends AbstractPageDirective implements OnInit {

  public walletType: string = WalletType.BTC;
  public sendForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private blockchainService: BlockchainService,
    private notificationService: NotificationService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initSendForm();
  }

  initSendForm(): void {
    this.sendForm = new FormGroup({
      toAddress: new FormControl('', Validators.required),
      fromAddress: new FormControl(this.walletType, Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  createTransaction(): void {
    this.blockchainService.addTransaction(this.sendForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.bsModalRef.hide();
        this.notificationService.show('Your coins were sent successfully', 'success');
        this.blockchainService.isTransactionCreated.next(true);
      },
      (error) => this.notificationService.show(error.error.message, 'error')
    );
  }

  get isSendFormValid(): boolean {
    return !this.sendForm.valid;
  }
}
