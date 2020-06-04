import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsArr: any[] = [];
  private deviceInfo: any = {};

  private status: BehaviorSubject<any> = new BehaviorSubject(null);
  private statusArr: BehaviorSubject<any> = new BehaviorSubject(null);
  private deviceInfoStatus: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  getNotificationsData() {
    return this.status.getValue();
  }

  getNotificationsList() {
    return this.statusArr.getValue();
  }

  setNotification(notification: any) {
    this.notificationsArr.push(notification);
    this.status.next(notification);
    this.statusArr.next(this.notificationsArr);
  }

  setDeviceInfo(deviceInfo: any) {
    this.deviceInfo = deviceInfo;
    this.deviceInfoStatus.next(this.deviceInfo);
  }

  getDeviceInfo() {
    return this.deviceInfoStatus.getValue();
  }

  onNotificationChange(): Observable<any> {
    return this.status.asObservable();
  }

  onNotificationListChange(): Observable<any> {
    return this.statusArr.asObservable();
  }

  registerDevice(users: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users', users);
  }

  deviceNotifications(uuid: string): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + '/api/users/' + uuid + '/notifications'
    );
  }
}
