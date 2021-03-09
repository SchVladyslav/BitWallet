import { Component, Input, OnInit } from '@angular/core';
import { Chain, Transaction } from 'src/app/interfaces/Blockchain.interface';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {

  @Input() public block: Chain;  
  @Input() public transaction: Transaction;

  constructor() {
  }

  ngOnInit(): void {
    console.log('block', this.block);
    console.log('transaction', this.transaction);
  }
}
