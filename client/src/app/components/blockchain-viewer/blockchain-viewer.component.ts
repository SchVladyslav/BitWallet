import { Component, OnInit } from '@angular/core';
import { Chain } from 'src/app/interfaces/Blockchain.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {

  public blocks: Chain[] = [];

  constructor(private blockchainService: BlockchainService) {
  }

  ngOnInit(): void {
    this.blockchainService.blockchainSubject.subscribe(blockchain => this.blocks = blockchain?.chain);
  }
}
