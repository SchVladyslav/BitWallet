import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
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
  private selectedCurrency: string;
  private selectedWallet: string;

  constructor(
    private bsModalRef: BsModalRef,
    private blockchainService: BlockchainService,
    private notificationService: NotificationService,
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initSendForm();
  }

  initSendForm(): void {
    this.sendForm = new FormGroup({
      toAddress: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32)]),
      fromAddress: new FormControl(this.walletType, Validators.required),
      amount: new FormControl('', Validators.required),
      currency: new FormControl('')
    });
  }

  createTransaction(): void {
    this.blockchainService.addTransaction(this.sendForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.bsModalRef.hide();
        this.notificationService.show('Your coins were sent successfully', 'success');
        this.blockchainService.getBlockchainInstance();
        this.blockchainService.getBalance();
      },
      (error) => {
        this.bsModalRef.hide();
        this.notificationService.show(error.error.message, 'error');
      }
    );
  }

  public selectedCryptoCurrency(event): void {
    this.selectedCurrency = event;
    this.sendForm.patchValue({
      currency: this.selectedCurrency
    });
    console.log(this.sendForm.get('currency').value);
  }

  public selectedCryptoWallet(event): void {
    this.selectedWallet = event;
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  get isSendFormValid(): boolean {
    return !this.sendForm.valid;
  }
}
