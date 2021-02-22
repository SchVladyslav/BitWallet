import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Keys } from '../../interfaces/Keys.interface';
import { NotificationService } from '../notification.service';
import { Blockchain, Chain } from '../../interfaces/Blockchain.interface';
import { AbstractPageDirective } from 'src/app/shared/abstract-page/abstract-page.directive';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService extends AbstractPageDirective {
  private walletKeys: Keys[] = [];
  private baseUrl: string = '/api/blockchain';

  public blockchainSubject: BehaviorSubject<Blockchain> = new BehaviorSubject<Blockchain>(null); 

  constructor(
    private http: HttpClient, 
    private notificationService: NotificationService
  ) {
    super();
    this.getWalletKeys();
    this.getBlockchainInstance();
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
    this.walletKeys.push({
      keyObj: keys.keyObj,
      publicKey: keys.publicKey,
      privateKey: keys.privateKey
    });
    console.log(this.walletKeys);
  }

  private getBlockchainInstance(): void {
    this.http.get<Blockchain>(`${this.baseUrl}/blockchain`)
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (blockchain: Blockchain) => this.blockchainSubject.next(blockchain),
        (error) => this.notificationService.show(error.error.message, 'error')
      );
  }
}
