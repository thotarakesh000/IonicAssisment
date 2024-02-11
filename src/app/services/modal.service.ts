import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConsentModalComponent } from '../shared/consent-modal/consent-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalCtrl:ModalController) { }

  consentModal(){
  return new Promise((resolve,reject)=>{
    this.modalCtrl.create({
      component:ConsentModalComponent,
     
      backdropDismiss:false
    }).then((res)=>{
      res.present();
      res.onDidDismiss().then((resp)=>{
      console.log(resp);
      resolve(resp)
    },(error)=>{
      reject(true)
    })    
    })
  })
  
  }
 async closeModal(data:any){
      let checkModal=await  this.modalCtrl.getTop();
      if(checkModal){
        this.modalCtrl.dismiss(data);
      }
  }
}
