import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Chain, Transaction } from 'src/app/interfaces/Blockchain.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent extends AbstractPageDirective implements OnInit {

  public blocks: Chain[] = [];
  public selected: Chain;

  constructor(
    private blockchainService: BlockchainService,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getBlockchain();
    this.startMining();
    // this.spinner.hide();
  }

  private getBlockchain(): void {
    this.blockchainService.blockchainSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        blockchain => {
          this.blocks = blockchain?.chain
          console.log(blockchain);
        }, // getBlocks(),
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }

  private startMining(): void {
    this.blockchainService.isTransactionCreated
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data) {
            this.mineBlock();
          }
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }

  public selectedBlock(block: Chain) {
    this.selected = block;
  }

  private mineBlock(): void {
    this.blockchainService.minePendingTransactions().subscribe(data => { console.log(data) });
  }

  public trackBy(index: number, block: Chain): number {
    return index;
  }
}
