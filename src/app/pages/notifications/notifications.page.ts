import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import { NotificationsService } from './../../services/notifications.service';

import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/core';

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
        this.notificationsArr = notification;
      }
    });
  }

  ngOnInit(): void {}

  gotoDetails(notification: any) {
    this.navCtrl.navigateForward('/main/details', {
      queryParams: {
        notification: JSON.stringify(notification),
      },
    });
  }
}
