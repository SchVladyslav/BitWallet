import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Keys } from '../../interfaces/Keys.interface';
import { NotificationService } from '../notification.service';
import { Blockchain, Transaction } from '../../interfaces/Blockchain.interface';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { takeUntil } from 'rxjs/operators';
import { Currency } from 'src/app/interfaces/WalletType.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService extends AbstractPageDirective {
  public walletKeys: Keys;
  private baseUrl: string = '/api/blockchain';

  public blockchainSubject: BehaviorSubject<Blockchain> = new BehaviorSubject<Blockchain>(null);
  public balanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public btcBalance: number = 0;
  public ethBalance: number = 0;
  public xrpBalance: number = 0;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {
    super();
    this.getWalletKeys();
    this.getBlockchainInstance();
    this.getBalance();
    this.getCurrencyBalance();
  }

  private getWalletKeys(): void {
    this.http.get<Keys>(`${this.baseUrl}/keys`)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (keys: Keys) => this.setKeys(keys),
        (error) => this.notificationService.show(error.error.message, 'error')
      );
  }

  private setKeys(keys: Keys): void {
    this.walletKeys = {
      keyObj: keys.keyObj,
      publicKey: keys.publicKey,
      privateKey: keys.privateKey
    };
  }

  public getBlockchainInstance(): void {
    this.http.get<Blockchain>(`${this.baseUrl}/blockchain`)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (blockchain: Blockchain) => this.blockchainSubject.next(blockchain),
      (error) => this.notificationService.show(error.error?.message || error.error, 'error')
    );
  }

  public getBalance(): void {
    this.http.get<number>(`${this.baseUrl}/balance`)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (balance: number) => this.balanceSubject.next(balance),
      (error) => this.notificationService.show(error.error?.message || error.error, 'error')
    );
  }

  private getCurrencyBalance(): void {
    this.blockchainSubject.subscribe(blockchain => {
      this.clearBalances();
      blockchain?.chain
      .forEach(item => {
        item.transactions
        .forEach(ts => {
          if (ts.currency === Currency.BTC) {
            ts.toAddress === this.walletKeys.publicKey
            ? this.btcBalance += Number(ts.amount)
            : this.btcBalance -= Number(ts.amount);
          }
          if (ts.currency === Currency.ETH) {
            ts.toAddress === this.walletKeys.publicKey
            ? this.ethBalance += Number(ts.amount)
            : this.ethBalance -= Number(ts.amount);
          }
          if (ts.currency === Currency.XRP) {
            ts.toAddress === this.walletKeys.publicKey
            ? this.xrpBalance += Number(ts.amount)
            : this.xrpBalance -= Number(ts.amount);
          }
        })
      })
    });
  }

  public getBalanceByCurrency(currency: string): number {
    if (currency === Currency.BTC) return this.btcBalance;
    if (currency === Currency.ETH) return this.ethBalance;
    if (currency === Currency.XRP) return this.xrpBalance;
  }

  public getAllCurrenciesBalance(): number[] {
    return [this.btcBalance, this.ethBalance, this.xrpBalance];
  }

  public getAllCurrenciesNames(): string[] {
    return ['BTC', 'ETH', 'XRP'];
  }

  public currentCurrencyLocation(): string {
    return this.router.url.slice(1).toUpperCase();
  }

  public addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`, transaction);
  }

  public recieveTransaction(recieveTransaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions/recieve`, recieveTransaction);
  }

  private minePendingTransactions() {
    return this.http.get<Transaction>(`${this.baseUrl}/transactions/mine`);
  }

  private getPendingTransactions() {
    return this.http.get<Transaction>(`${this.baseUrl}/transactions/pending`);
  }

  private clearBalances(): void {
    this.btcBalance = 0;
    this.ethBalance = 0;
    this.xrpBalance = 0;
  }
}
