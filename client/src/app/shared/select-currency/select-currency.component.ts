import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICryptoList } from 'src/app/interfaces/CryptoList';
import { Currency } from 'src/app/interfaces/WalletType.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { CryptoList } from '../../helpers/select-currency.config';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss']
})
export class SelectCurrencyComponent implements OnInit {

  cryptoList: ICryptoList[];
  currentGlobalCurrency: string;
  @Input() walletType: string;
  @ViewChild('img', { static: false }) image;
  @Output() selectedCrypto: EventEmitter<string> = new EventEmitter<string>();

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.cryptoList = CryptoList;
  }

  ngAfterViewInit() {
    if (this.image && !Currency[this.currentGlobalCurrency]) {
      this.image.nativeElement.src = this.cryptoList[0].imageUrl;
    }
    this.initAndChangeSelectFromGlobal();
  }

  private initAndChangeSelectFromGlobal(): void {
    this.currentGlobalCurrency = this.blockchainService.currentCurrencyLocation();
    this.selectedCrypto.emit(Currency[this.currentGlobalCurrency] || 'BTC');
    this.changeCryptoImage(Currency[this.currentGlobalCurrency]);
  }

  selectChangeHandler($event: any): void {
    this.selectedCrypto.emit($event.target.value);
    this.changeCryptoImage($event.target.value);
  }

  changeCryptoImage(selectedCrypto: string) {
    for (const crypto of this.cryptoList) {
      if (selectedCrypto === crypto.ticker) {
        this.image.nativeElement.src = crypto.imageUrl;
      }
    }
  }
}
