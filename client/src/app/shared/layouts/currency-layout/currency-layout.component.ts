import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';
import { BlockchainService } from '../../../services/blockchain/blockchain.service'
import { AbstractPageDirective } from '../../abstract-page/abstract-page.directive';

@Component({
  selector: 'app-currency-layout',
  templateUrl: './currency-layout.component.html',
  styleUrls: ['./currency-layout.component.scss']
})
export class CurrencyLayoutComponent extends AbstractPageDirective implements OnInit {

  constructor(private blockchainService: BlockchainService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
        // this.spinner.hide();
        // this.notificationService.show(error.error.message, 'error');
    //   }
    // )
  }

}
