import { Component } from '@angular/core';
import { Plugins, PushNotificationToken } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fcmToken: string;
  constructor(
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor') || this.platform.is('cordova')) {
        // On success, we should be able to receive notifications
        Plugins.PushNotifications.addListener(
          'registration',
          (token: PushNotificationToken) => {
            console.log('Push registration success, token: ' + token.value);
            this.fcmToken = token.value;
          }
        );
      }
    });
  }

  subscribeNotification() {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      Plugins.PushNotifications.requestPermission().then((result) => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          Plugins.PushNotifications.register();
        } else {
          // Show some error
        }
      });
    }
  }

  async copyToken() {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      Plugins.Clipboard.write({
        string: this.fcmToken,
      });
    }
    const toast = await this.toastController.create({
      message: 'FCM token copied',
      duration: 2000,
    });
    toast.present();
  }
}
