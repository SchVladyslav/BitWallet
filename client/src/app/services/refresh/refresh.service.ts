import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RefreshService {
  private readonly refreshPageEmitter$: Subject<void>;

    constructor() {
    this.refreshPageEmitter$ = new Subject<void>();
  }

  onRefreshPage(): void {
    this.refreshPageEmitter$.next();
  }

  get refreshPageListener$(): Subject<void> {
    return this.refreshPageEmitter$;
  }
}
