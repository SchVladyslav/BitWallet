import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { takeUntil } from 'rxjs/operators';
import { CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { WalletType } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { CalculationsUtils } from '../../utils/calculations/CalculationsUtils';

@Component({
  selector: 'app-send-modal',
  templateUrl: './send-modal.component.html',
  styleUrls: ['./send-modal.component.scss']
})
export class SendModalComponent extends AbstractPageDirective implements OnInit {

  public walletType: string = WalletType.BTC;
  public sendForm: FormGroup;
  private coinCup: CoinCupContent;

  constructor(
    private bsModalRef: BsModalRef,
    private blockchainService: BlockchainService,
    private notificationService: NotificationService,
    private coinMarketCupService: CoinMarketCupService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initSendForm();
    this.initCoinCup();
  }

  private initSendForm(): void {
    this.sendForm = new FormGroup({
      toAddress: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32)]),
      fromAddress: new FormControl(this.walletType), //, Validators.required
      amount: new FormControl('', Validators.required),
      cryptoAmount: new FormControl(''),
      currency: new FormControl(''),
      description: new FormControl('')
    });
  }

  private initCoinCup(): void {
    this.coinCup = this.coinMarketCupService.coinCup;
  }

  private checkBalance(): boolean {
    const currencyBalance: number = this.blockchainService.getBalanceByCurrency(this.sendForm.get('currency').value);
    return currencyBalance < Number(this.sendForm.get('cryptoAmount').value);
  }

  createTransaction(): void {
    if (this.checkBalance()) {
      this.bsModalRef.hide();
      this.notificationService.show('Not enough money on your balance!', 'error');
    } else {
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
  }

  public selectedCryptoCurrency(event): void {
    this.sendForm.reset();
    this.sendForm.patchValue({
      currency: event
    });
  }

  // public selectedCryptoWallet(event): void {
  //   this.selectedWallet = event;
  // }

  public onAmountOrCrypto(event: Event): void {
    const target = event.target as HTMLInputElement;
    const formControlName: string = target.attributes.getNamedItem('formcontrolname')?.nodeValue;
    const currencyPrice: number = this.coinCup[this.currentCurrency].price;
    let value: number;
    
    if (formControlName === 'amount') {
      value = CalculationsUtils.convertMoneyIntoCrypto(Number(target.value), currencyPrice);
      this.sendForm.patchValue({
        cryptoAmount: value.toFixed(6)
      });
    } else {
      value = CalculationsUtils.convertCryptoIntoMoney(Number(target.value), currencyPrice);
      this.sendForm.patchValue({
        amount: value.toFixed(2)
      });
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  get isSendFormValid(): boolean {
    return !this.sendForm.valid;
  }

  get currentCurrency(): string {
    return this.sendForm.get('currency').value;
  }
}
