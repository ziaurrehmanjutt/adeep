import { ToastService } from './../../../services/toast.service';
import { Component, OnInit } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/services/pages-apis/auth.service";
import { Router } from "@angular/router";
import { NavController, PopoverController } from "@ionic/angular";
import { AppComponent } from "src/app/app.component";;
import { NotificationsService } from 'src/app/services/extra/notifications.service';
import { LoginSettingComponent } from '../login-setting/login-setting.component';
// import {
//   Plugins,
//   PushNotification,
//   PushNotificationToken,
//   PushNotificationActionPerformed } from '@capacitor/core';

// const { PushNotifications } = Plugins;
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  passeye = "eye";
  passwordType = "password";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  };

  serverType = "1";
  serverType2 = "1";
  constructor(
    private loginService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private app: AppComponent,
    private toastService: ToastService,
    private noti: NotificationsService,
    private popoverController: PopoverController,
  ) //  private firebaseX: FirebaseX,
  //  private firebaseConfig: FirebaseConfig
  {}
  user_fire_base_token: any;
  register(form) {
    // this.router.navigateByUrl('cases/all-cases');
    // return;
    let postData = {
      grant_type: "password",
      scope: "*",
      client_id: "MOEPIIKPXCZPHZETAZTTJMGYYTLLWARH",
      client_secret: "6787116325f3dffbfa69216052519218",
      username: form.value.username,
      password: form.value.password,
    };
    this.loginService.login(postData).subscribe(
      (data) => {
        console.log(data);
        if (data.access_token) {
          localStorage.setItem('token', JSON.stringify(data));
          localStorage.setItem("token_access", data.access_token);
          localStorage.setItem("token_time", new Date().toDateString());
          this.getUserRoles();
        }
        //  
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    localStorage.setItem('server', '1');
  }

  cahgeValue(ev){
    console.log(this.serverType);
    const loginSever = this.serverType === '1' ? 'Live' : 'Test';
    this.toastService.SuccessToast('Now login with ' + loginSever + ' Server', 2000);
  }
  getUserRoles() {
    this.loginService.get_user_id().subscribe((data) => {
      try {
        console.log(data);
        console.log("roleeeeeeeeeeeeeeeeeeeeeeee", data.user_role);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("id", data.uid);
        localStorage.setItem("name", data.firstname);
        localStorage.setItem("role", data.user_role);
        localStorage.setItem("username", data.username);
        this.app.userName = data.firstname;  
        this.app.USER_ROLE_NAME = data.user_role;
        localStorage.setItem('allVisitTask','[]');
        if (data.user_role == "ADMIN_OFFICE" || data.user_role == "admin_office") {
          this.app.casesShow = true;
          this.app.ADMIN_OFFICE = true;
          this.navCtrl.navigateRoot("/admin/tabs/dashboard");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        } else if ( data.user_role == "PROCESSMAKER_ADMIN" || data.user_role == "processmaker_admin") {
          this.app.casesShow = true;
          this.app.PROCESSMAKER_ADMIN = true;
          this.navCtrl.navigateRoot("/admin/tabs/dashboard");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        } else if (data.user_role == "DOCTOR" || data.user_role == "doctor") {
          this.app.DOCTOR = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        } else if (data.user_role == "PATIENT_ROLES" || data.user_role == "patient_roles") {
          this.app.PATIENT = true;
          this.navCtrl.navigateRoot("/patient");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        } else if (data.user_role == "Caretaker" ||data.user_role == "CARETAKER") {
          this.app.CARETAKER = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        } else if ( data.user_role == "Physician" || data.user_role == "PHYSICIAN") {
          this.app.PHYSICIAN = true;
          this.navCtrl.navigateRoot("/cases");
          this.toastService.SuccessToast('Login Successfully!', 2000);
        }  else {
          this.navCtrl.navigateRoot("/");
          this.toastService.ErrorToast('Login failed', 1000);
        }
        this.noti.registerToken();
        // this.noti. showToast('Login Successful');
        // this.noti.localNotifications('Login Successful');
        this.app.loadData();
      } catch (error) {
        this.navCtrl.navigateRoot("/");
        this.toastService.ErrorToast('Login failed', 1000);
        console.log('some error occurred ', error);
      }
    });
  }

  managePassword() {
    console.log("eye change");
    if (this.passwordType === "password") {
      this.passwordType = "text";
      this.passeye = "eye-off";
    } else {
      this.passwordType = "password";
      this.passeye = "eye";
    }
  }
  // serverType;
  async showSetting(ev: any){
    this.serverType2 = localStorage.getItem('server');

    const popover = await this.popoverController.create({
      component: LoginSettingComponent,
      cssClass: 'my-custom-class',
      event: ev,
      componentProps : {serverType: this.serverType2},
      translucent: true
    });
    return await popover.present();
  }
}
