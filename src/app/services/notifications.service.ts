import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsArr: any[] = [];

  private status: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}

  getNotificationsData() {
    return this.status.getValue();
  }

  setNotification(notification: any) {
    this.notificationsArr.push(notification);
    this.status.next(this.notificationsArr);
  }

  onNotificationChange(): Observable<any> {
    return this.status.asObservable();
  }
}
