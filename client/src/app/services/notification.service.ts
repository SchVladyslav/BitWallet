import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/Notification';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

    private notification$: Subject<Notification> = new Subject<Notification>();
  
    public getNotification(): Subject<Notification> {
      return this.notification$;
    }

    public show(message: string, type?: string) {
        this.notification$.next({message, type});
    }
  }