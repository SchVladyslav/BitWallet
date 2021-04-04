import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { CoinCup, CoinCupContent, CoinCupData } from '../../interfaces/CoinCup.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinMarketCupService extends AbstractPageDirective {

  private baseUrl: string = '/api/coinmarketcup';
  public coinCup: CoinCupContent;
  public coinCupSubject: Subject<CoinCupContent> = new Subject<CoinCupContent>();
     
  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  private getCoinMarketCup(): Observable<CoinCup> {
    return this.http.get<CoinCupData>(`${this.baseUrl}/coin_cup`)
      .pipe(map((response) => response.data));
  }

  public getCoinCup(): void {
    this.getCoinMarketCup()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
         this.coinCupSubject.next(this.setCurrenciesPrices(data));
      });
  }

  private setCurrenciesPrices(coin: CoinCup): CoinCupContent {
    return this.coinCup = {
      BTC: {
        name: coin.BTC[0].name,
        symbol: coin.BTC[0].symbol,
        price: coin.BTC[0].quote.USD.price,
        change: coin.BTC[0].quote.USD.percent_change_24h
      },
      ETH: {
        name: coin.ETH[0].name,
        symbol: coin.ETH[0].symbol,
        price: coin.ETH[0].quote.USD.price,
        change: coin.ETH[0].quote.USD.percent_change_24h
      },
      XRP: {
        name: coin.XRP[0].name,
        symbol: coin.XRP[0].symbol,
        price: coin.XRP[0].quote.USD.price,
        change: coin.XRP[0].quote.USD.percent_change_24h
      }
    }
  }

  public getCurrencyCoinCup(): Subject<CoinCupContent> {
    this.getCoinCup();
    return this.coinCupSubject;
  } 
}
