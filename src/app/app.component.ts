import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { App } from '@capacitor/app';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform, private alertController: AlertController) {
    this.readyPlatform();
    this.platform.backButton.subscribeWithPriority(100, async () => {
      console.log("enter into back button")
      let data = await this.alertController.getTop();
      console.log("enter into back button data", data)
      if (data) {
        this.alertController.dismiss();
      }

      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'are you sure want to close',
        buttons: [{
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: async () => {
            console.log("enter ok");
            App.exitApp();
            // Perform navigation or other action
          }
        }],
      });
      console.log("enter into back button present")

      await alert.present();

    });

  }


  readyPlatform() {
    this.platform.ready().then(async () => {
      if (this.platform.is("hybrid")) {
        await SplashScreen.hide();

      } else {
        GoogleAuth.initialize();
      }
    })
  }

}

