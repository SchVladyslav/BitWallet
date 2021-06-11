import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.scss']
})
export class RequestModalComponent extends AbstractPageDirective implements OnInit {

  public requestForm: FormGroup;
  public walletType: string = WalletType.BTC;
  private coinCup: CoinCupContent;

  constructor(
    public bsModalRef: BsModalRef,
    private blockchainService: BlockchainService,
    private notificationService: NotificationService,
    private coinMarketCupService: CoinMarketCupService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initRequestForm();
    this.initCoinCup();
  }

  initRequestForm(): void {
    this.requestForm = new FormGroup({
      fromAddress: new FormControl('', [Validators.required, Validators.minLength(32), Validators.maxLength(32)]),
      amount: new FormControl('', Validators.required),
      cryptoAmount: new FormControl(''),
      description: new FormControl(''),
      currency: new FormControl('')
    });
  }
  
  private initCoinCup(): void {
    this.coinCup = this.coinMarketCupService.coinCup;
  }

  request(): void {
    this.blockchainService.recieveTransaction(this.requestForm.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.bsModalRef.hide();
        this.notificationService.show('Coins have been received successfully!', 'success');
        this.blockchainService.getBlockchainInstance();
        this.blockchainService.getBalance();
      },
      (error) => {
        this.bsModalRef.hide();
        this.notificationService.show(error.error.message, 'error');
      }
    );
  }

  public selectedCryptoCurrency(event: string): void {
    this.requestForm.reset();
    this.requestForm.patchValue({
      currency: event
    });
  }

  public onAmountOrCrypto(event: Event): void {
    const target = event.target as HTMLInputElement;
    const formControlName: string = target.attributes.getNamedItem('formcontrolname')?.nodeValue;
    const currencyPrice: number = this.coinCup[this.currentCurrency].price;
    let value: number;
    
    if (formControlName === 'amount') {
      value = CalculationsUtils.convertMoneyIntoCrypto(Number(target.value), currencyPrice);
      this.requestForm.patchValue({
        cryptoAmount: value.toFixed(6)
      });
    } else {
      value = CalculationsUtils.convertCryptoIntoMoney(Number(target.value), currencyPrice);
      this.requestForm.patchValue({
        amount: value.toFixed(2)
      });
    }
  }

  closeModal(): void {
    this.bsModalRef.hide();
  }

  get isRequestFormValid(): boolean {
    return !this.requestForm.valid;
  }

  get currentCurrency(): string {
    return this.requestForm.get('currency').value;
  }
}
