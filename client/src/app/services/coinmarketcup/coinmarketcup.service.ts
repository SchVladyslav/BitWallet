import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { NotificationService } from '../notification.service';
import { CoinCup, CoinCupContent } from '../../interfaces/CoinCup.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinMarketCupService extends AbstractPageDirective {

  private baseUrl: string = '/api/coinmarketcup';
  private coinCup: CoinCup;
     
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { 
    super();
  }

  public getCoinMarketCup(): Observable<CoinCup> {
    return this.http.get<CoinCupContent>(`${this.baseUrl}/coin_cup`)
    .pipe(map((response) => response.data));
  }
}
