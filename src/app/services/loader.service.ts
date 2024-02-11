import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loadingCtrl: LoadingController,private toastController:ToastController) { }

 async showLoader(){
   let loaderPresent=await this.loadingCtrl.create({});
   await loaderPresent.present();
  }
 async hideLoader(){
    let checkloader=await this.loadingCtrl.getTop();
    if(checkloader)
    await this.loadingCtrl.dismiss();
  }
  async showToaster(message:any){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
