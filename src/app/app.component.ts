import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private notifications: NotificationsService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor') || this.platform.is('cordova')) {
        Plugins.StatusBar.show();
        Plugins.SplashScreen.hide();

        // Show us the notification payload if the app is open on our device
        Plugins.PushNotifications.addListener(
          'pushNotificationReceived',
          (notification: PushNotification) => {
            // alert('Push received: ' + JSON.stringify(notification));
            if (notification) {
              this.notifications.setNotification(notification);
            }
          }
        );

        // Some issue with our setup and push will not work
        Plugins.PushNotifications.addListener(
          'registrationError',
          (error: any) => {
            // alert('Error on registration: ' + JSON.stringify(error));
          }
        );

        // Method called when tapping on a notification
        Plugins.PushNotifications.addListener(
          'pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            // alert('Push action performed: ' + JSON.stringify(notification));
            this.gotoDetails(notification);
          }
        );
      }
    });
  }

  gotoDetails(notification: any) {
    this.navCtrl.navigateForward('/main/details', {
      queryParams: {
        notification: JSON.stringify(notification),
      },
    });
  }
}
