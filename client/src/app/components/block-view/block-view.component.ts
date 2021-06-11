import { Component, Input, OnInit } from '@angular/core';
import { Chain, Transaction } from 'src/app/interfaces/Blockchain.interface';
import { CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { CoinMarketCupService } from 'src/app/services/coinmarketcup/coinmarketcup.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {

  private publicKey: string;
  public coinCup: CoinCupContent;

  @Input() public block: Chain;  
  @Input() public transaction: Transaction;

  constructor(private blockchainService: BlockchainService, private coinMarketCupService: CoinMarketCupService) {
  }

  ngOnInit(): void {
    this.publicKey = this.blockchainService.walletKeys.publicKey;
    this.coinCup = this.coinMarketCupService.coinCup;
  }

  get currencyPrice(): number {
    return this.coinCup[this.transactionCurrency].price * this.transaction?.amount;
  }

  get checkWalletReciever(): string {
    return this.transaction.fromAddress === this.publicKey
    ? 'Sent'
    : 'Received';
  }

  get transactionCurrency(): string {
    return this.transaction?.currency;
  }
}
