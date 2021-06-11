import { Component, OnInit } from '@angular/core';
import { CoinCupContent } from 'src/app/interfaces/CoinCup.interface';
import { CoinMarketCupService } from '../../services/coinmarketcup/coinmarketcup.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public coinCup: CoinCupContent;

  constructor(private coinMarketCupService: CoinMarketCupService) { }

  ngOnInit(): void {
    this.coinMarketCupService.getCurrencyCoinCup().subscribe(coinCup => this.coinCup = coinCup);
  }
}
