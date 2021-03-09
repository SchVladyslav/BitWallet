import { Component, OnInit } from '@angular/core';
import { Blockchain } from 'src/app/interfaces/Blockchain.interface';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  public miningReward: number;
  public difficulty: number;

  constructor(private blockchainService: BlockchainService) {
  }

  ngOnInit(): void {
    this.blockchainService.blockchainSubject.subscribe(blockchain => {
      this.miningReward = blockchain?.miningReward;
      this.difficulty = blockchain?.difficulty;
    });
  }
}
