import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/interfaces/Blockchain.interface';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @Input() public transaction: Transaction;

  constructor() { }

  ngOnInit(): void {
  }

}
