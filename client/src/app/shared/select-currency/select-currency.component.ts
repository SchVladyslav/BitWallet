import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CryptoList } from 'src/app/interfaces/CryptoList';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss']
})
export class SelectCurrencyComponent implements OnInit {

  cryptoList: CryptoList[];
  @Input() walletType: string;
  @ViewChild('img', { static: false }) image;
  @Output() selectedCrypto: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.selectedCrypto.emit('BTC');
    this.cryptoList = [
      { name: 'Bitcoin', ticker: 'BTC', imageUrl: '../../../assets/icons/svg/icon-Bitcoin.svg' },
      { name: 'Ether', ticker: 'ETH', imageUrl: '../../../assets/icons/svg/icon-Ethereum.svg' },
      { name: 'Ripple', ticker: 'XRP', imageUrl: '../../../assets/icons/svg/icon-Xrp.svg' }
    ];
  }

  ngAfterViewInit() {
    if (this.image) {
      this.image.nativeElement.src = this.cryptoList[0].imageUrl;
    }
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
