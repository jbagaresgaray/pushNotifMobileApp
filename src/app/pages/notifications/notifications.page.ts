import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { catchError, map } from 'rxjs/operators';
import { NotificationsService } from './../../services/notifications.service';
import { of } from 'rxjs';

@Component({
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.css'],
})
export class NotificationsPage implements OnInit {
  notificationsArr: any[] = [];

  constructor(
    private notifications: NotificationsService,
    private navCtrl: NavController
  ) {
    this.notifications.onNotificationChange().subscribe((notification: any) => {
      console.log('NotificationsPage notifications: ', notification);
      if (notification) {
        this.notificationsArr.unshift(notification);
      }
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  doRefresh(ev: any) {
    this.loadUsers();
    setTimeout(() => {
      if (ev && ev.target) {
        ev.target.complete();
      }
    }, 2000);
  }

  loadUsers() {
    const deviceInfo = this.notifications.getDeviceInfo();
    if (deviceInfo) {
      this.notifications
        .deviceNotifications(deviceInfo.uuid)
        .pipe(
          map((res) => res.data),
          catchError(() => of([]))
        )
        .subscribe((res) => {
          if (res) {
            this.notificationsArr = res;
          }
        });
    }
  }

  gotoDetails(notification: any) {
    this.navCtrl.navigateForward('/main/details', {
      queryParams: {
        notification: JSON.stringify(notification),
      },
    });
  }
}
