import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Keys } from '../../interfaces/Keys.interface';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private blockchain: any = null;
  private walletKeys: any[] = [];

  constructor(
    private http: HttpClient, 
    private notificationService: NotificationService
  ) {
    this.getWalletKeys();
  }

  private getWalletKeys(): void {
    this.http.get<Keys>('/api/blockchain/keys')
      .pipe()
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
}
