import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Blockchain, Chain } from 'src/app/interfaces/Blockchain.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent extends AbstractPageDirective implements OnInit {

  public chain: Chain[] = [];
  public selected: Chain;

  constructor(
    private blockchainService: BlockchainService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getBlockchain();
  }

  private getBlockchain(): void {
    this.spinner.show();
    this.blockchainService.blockchainSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        blockchain => {
          this.chain = this.filterTransactionsByCurrency(blockchain)
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }

  private filterTransactionsByCurrency(blockchain: Blockchain): Chain[] {
    const newChain: Chain[] = [];
    const currencyName: string = this.router.url.slice(1).toUpperCase()
    blockchain?.chain
    .forEach(chainItem => {
      chainItem.transactions.forEach(ts => {
        if (ts.currency === currencyName) {
          newChain.push(chainItem);
        } 
      })
    })
    return newChain;
  }

  public selectedBlock(block: Chain) {
    this.selected = block;
  }

  public trackBy(index: number, block: Chain): number {
    return index;
  }
}
