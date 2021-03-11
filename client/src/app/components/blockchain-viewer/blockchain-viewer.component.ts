import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { takeUntil } from 'rxjs/operators';
import { Chain } from 'src/app/interfaces/Blockchain.interface';
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
          this.chain = blockchain?.chain  // getBlocks(),
          console.log(blockchain);
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          this.notificationService.show(error.error.message, 'error');
        });
  }

  public selectedBlock(block: Chain) {
    this.selected = block;
  }

  public trackBy(index: number, block: Chain): number {
    return index;
  }
}
