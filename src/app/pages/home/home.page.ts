import { Component, NgZone } from '@angular/core';
import { Plugins, PushNotificationToken } from '@capacitor/core';
import { Platform, ToastController } from '@ionic/angular';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fcmToken: string;
  constructor(
    private zone: NgZone,
    private platform: Platform,
    private toastController: ToastController,
    private notifService: NotificationsService
  ) {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor') || this.platform.is('cordova')) {
        // On success, we should be able to receive notifications
        Plugins.PushNotifications.addListener(
          'registration',
          (token: PushNotificationToken) => {
            this.zone.run(() => {
              this.fcmToken = token.value;
            });
            this.registerDevice(token.value);
            const toasts = this.toastController.create({
              message: 'Push Notificatio Registration Success',
              duration: 2000,
            });
            toasts.then((toast) => toast.present());
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

  private registerDevice(token) {
    const deviceInfo = this.notifService.getDeviceInfo();
    const createUser = {
      platform: deviceInfo.platform,
      modelName: deviceInfo.model,
      manufacturer: deviceInfo.manufacturer,
      uuid: deviceInfo.uuid,
      appVersion: deviceInfo.appVersion,
      appBuild: deviceInfo.appBuild,
      operatingSystem: deviceInfo.operatingSystem,
      osVersion: deviceInfo.osVersion,
      pushToken: token,
    };
    console.log('createUser: ', createUser);
    this.notifService.registerDevice(createUser).subscribe((res: any) => {
      if (res && res.success) {
        const toasts = this.toastController.create({
          message: 'Device successfully registered',
          duration: 2000,
        });
        toasts.then((toast) => toast.present());
      }
    });
  }
}
