import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { WalletType } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})
export class RequestModalComponent extends AbstractPageDirective implements OnInit {

  public requestForm: FormGroup;
  public walletType: string = WalletType.BTC;

  constructor(
    public bsModalRef: BsModalRef,
    private blockchainService: BlockchainService,
    private notificationService: NotificationService,
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initRequestForm();
  }

  initRequestForm(): void {
    this.requestForm = new FormGroup({
      fromAddress: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32)]),
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }
  
  request(): void {
    this.blockchainService.recieveTransaction(this.requestForm.value)
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

  closeModal(): void {
    this.bsModalRef.hide();
  }

  get isRequestFormValid(): boolean {
    return !this.requestForm.valid;
  }
}
