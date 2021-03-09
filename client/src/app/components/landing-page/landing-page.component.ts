import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinCup } from 'src/app/interfaces/CoinCup.interface';
import { CoinMarketCupService } from '../../services/coinmarketcup/coinmarketcup.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  coinCup$: Observable<CoinCup> = this.coinMarketCupService.getCoinMarketCup();

  constructor(private coinMarketCupService: CoinMarketCupService) { }

  ngOnInit(): void {
  }
}
