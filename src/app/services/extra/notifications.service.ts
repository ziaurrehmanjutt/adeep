import { ReturnStatement } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed, LocalNotification, NotificationChannel
} from '@capacitor/core';
import { ToastController } from '@ionic/angular';
// import { AppComponent } from 'src/app/app.component';
import { ApiService } from '../api.service';
import { EndpointsService } from '../endpoints.service';

const { PushNotifications } = Plugins;
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private api: ApiService,
    private toastController: ToastController,
    private route:Router,
    // private app: AppComponent,
    private endPoints: EndpointsService) {

    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        console.log(notification);
        this.localNotifications(notification.data.message);
        this.showToast(notification.data.message);
        // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {

        this.navigateNotification();

        // alert('Push action performed: ' + JSON.stringify(notification));
      }
    );


    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    LocalNotifications.requestPermission().then(data => {
      console.log(data);
    })
  }

  navigateNotification(){
    const ROLE = localStorage.getItem('role');
    // const USER = this.app.userName;
    // if(!USER || !ROLE || USER == ''){
    //   return;
    // }
    if (ROLE == "ADMIN_OFFICE" || ROLE == "PROCESSMAKER_ADMIN" ){
      this.route.navigateByUrl('/admin/tabs/notifications');
    }else if (ROLE == "PHYSICIAN"){
      this.route.navigateByUrl('/physician/notifications');
    }else if (ROLE == "CARETAKER"){
      this.route.navigateByUrl('/doctor/notifications');
    }else if(ROLE == 'DOCTOR'){
      this.route.navigateByUrl('/doctor/notifications');
    }else if(ROLE == 'PATIENT_ROLES'){
      this.route.navigateByUrl('/patient/tabs/notifications');
    }
  }
  registerToken() {
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        console.log('Token is', token);
        console.log(token);

        let user = {
          user_id: localStorage.getItem('id'),
          user_access_token: token.value,
          // user_access_token: 'sdkfdkbfkdshfkjdshfkjdshfkjsdhf89823874987239ddjsjfsbhsdsdhfvfsdbhscbwgfuwjsdhf988',
        }
        this.set_user_token(user).subscribe(response => {
          console.log(response);
        });

      }
    );

  }

  async localNotifications(body) {
    console.log(new Date(new Date().getTime() + 20));
    console.log(new Date().getTime());

    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "Adeeb Pathway",
          body: body,
          channelId : '1023',
          id: new Date().getTime(),
          schedule: { at: new Date(new Date().getTime() + 1000) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });

    console.log('scheduled notifications', notifs);
  }

  async showToast(body) {
    const toast = await this.toastController.create({
      header: 'New Notification',
      message: body,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          text: '',
          icon: 'eye',
          handler: () => {
            console.log('Cancel clicked');
            this.navigateNotification();
          }
        }
      ]
    });
    toast.present();
  }
  set_user_token(formData) {
    return this.api.commonPost(formData, { isToken: false, endPointUrl: this.endPoints.SET_USER_TOKEN, showLoading: true, showError: true });
  }
}
