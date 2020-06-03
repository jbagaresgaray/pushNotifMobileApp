import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/core';

import { NotificationsService } from '../../services/notifications.service';

@Component({
  templateUrl: './tab-pages.page.html',
  styleUrls: ['./tab-pages.page.css'],
})
export class TabPagesPage implements OnInit {
  notificationsArr: any[] = [];

  constructor(
    private zone: NgZone,
    private platform: Platform,
    private notifications: NotificationsService
  ) {
    this.notifications.onNotificationChange().subscribe((notification: any) => {
      console.log('TabPagesPage notifications: ', notification);
      if (notification) {
        this.zone.run(() => {
          this.notificationsArr = notification;
        });
      }
    });
  }

  ngOnInit(): void {}
}
