import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CryptoList } from '../../interfaces/CryptoList';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cryptoList: CryptoList[];
  selectedCrypto: string;
  @ViewChild('img', {static: false}) image;

  constructor() { }

  ngOnInit(): void {
    this.cryptoList = [
      {name: 'Bitcoin', ticker: 'BTC', imageUrl: '../../../assets/icons/svg/icon-Bitcoin.svg'}, 
      {name: 'Ether', ticker: 'ETH', imageUrl: '../../../assets/icons/svg/icon-Ethereum.svg'},
      {name: 'Ripple', ticker: 'XRP', imageUrl: '../../../assets/icons/svg/icon-Xrp.svg'}
    ];
  }

  ngAfterViewInit() {
    this.image.nativeElement.src = this.cryptoList[0].imageUrl;
  }

  selectChangeHandler($event: any): void {
    this.selectedCrypto = $event.target.value;
    this.changeCryptoImage(this.selectedCrypto);
  }

  changeCryptoImage(selectedCrypto) {
    for (const crypto of this.cryptoList) {
     if (selectedCrypto === crypto.ticker) {
      this.image.nativeElement.src = crypto.imageUrl;
     }
    }
  }
}
