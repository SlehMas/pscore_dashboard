import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NotificationService {

  private message = new BehaviorSubject('');
  sharedMessage = this.message.asObservable();
  constructor() {
  }

  notify(val) {

    this.message.next(val);
    setTimeout(() => {
      this.message.next('');
    }, 2000);
  }

  getMessage() {
    return this.message;
  }
}
