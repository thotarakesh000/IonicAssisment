import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { DatePipe } from '@angular/common';
import { ModalService } from '../services/modal.service';
import { LoginService } from '../services/login.service';
import { LoaderService } from '../services/loader.service';
import { NavController, Platform } from '@ionic/angular';
import { NativeGeocoder } from '@capgo/nativegeocoder';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  formSubmit: boolean = false;
  showImage:any=false;
  imageData:any="";
  photos:any=[];
    constructor(private fb: FormBuilder,
    private platform:Platform,
    private datePipe: DatePipe,
    private loader:LoaderService,
    private navctrl:NavController,
    private modalService:ModalService,
    private loginService:LoginService) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      dateOfBirth: ["", [Validators.required]],
      mobileNumber: ["", Validators.required],
      userPassword: ["", Validators.required],
      image: ["", Validators.required],
      terms: [ null,Validators.requiredTrue]

    });
    const date = new Date(); // Example: Current date
    this.registerForm.patchValue({
      dateOfBirth: date.toISOString()
    });
  }

  ngOnInit() {
   

  }
  ionViewWillEnter(){
    this.getCurrentPosition();
  }
  async getCurrentPosition() {
    try {
      console.log('Reverse Geocode Result:');

      await Geolocation.getCurrentPosition().then(async (position)=>{
        this.registerForm.patchValue({
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude
  
        });
        console.log('Reverse Geocode Result:', position);

        try {
          const coordinates = {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
          };
          const result = await NativeGeocoder.reverseGeocode(coordinates);
        
      let addressData= result?.addresses[0].subLocality+" , "+result?.addresses[0].locality+" , "+result?.addresses[0].administrativeArea+" , "+result?.addresses[0].postalCode
          this.registerForm.patchValue({
            address: addressData
    
          });
          // Handle the result
        } catch (error) {
          console.error('Error performing reverse geocoding:', error);
        }
      });
      // console.log('Current Position:', position);
     
    

    } catch (error) {
      console.error('Error getting current position:', error);
    }
  }
  async checkboxChange(event: any) {
    if(event.detail.checked){
     let data:any=await this.modalService.consentModal();
     console.log(data);
     if(data.data=="y"){

     }else{
      this.registerForm.patchValue({
        terms: false
      });
     }
    }
  }
  async getImage(){
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // automatically take a new photo with the camera

      });
      console.log("image",image);
      this.showImage=true;
      const savedImageFile = await this.savePicture(image);
      this.photos.unshift(savedImageFile);
      
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      // this.showImage =`data:image/${image.format};base64,`+ image.base64String;
    
    console.log(savedImageFile,"showImage",this.showImage)
      // Can be set to the src of an image now
      // imageElement.src = imageUrl;
    
  }
 // Save picture to file on device
private async savePicture(photo: Photo) {
  // Convert photo to base64 format, required by Filesystem API to save
  const base64Data = await this.readAsBase64(photo);
  console.log("base64Data",`data:image/${photo.format};base64,`+base64Data);
  if(this.platform.is("hybrid")){
    this.imageData=`data:image/${photo.format};base64,`+base64Data;
  }else{
    this.imageData=base64Data;

  }
  this.registerForm.patchValue({
    image:base64Data
  })
  // Write the file to the data directory
  const fileName = Date.now() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data
  });

  if (this.platform.is('hybrid')) {
    // Display the new image by rewriting the 'file://' path to HTTP
    // Details: https://ionicframework.com/docs/building/webview#file-protocol
    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }
  else {
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  }
}
  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
  
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
  
      return await this.convertBlobToBase64(blob) as string;
    }
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  registerUser() {
    console.log(this.datePipe.transform(this.registerForm.value.dateOfBirth, 'yyyy-MM-dd'),"this.registerForm.value ",this.registerForm.value)
    this.formSubmit = true;
    if(!this.registerForm.valid){
      return;
     }
      this.loader.showLoader();
      let reqdata={"firstName":this.registerForm.value.firstName,"lastName":this.registerForm.value.lastName,
      "latitude":this.registerForm.value.latitude,"longitude":this.registerForm.value.longitude,
       "address":this.registerForm.value.address,"email":this.registerForm.value.email,
       "dateOfBirth":this.datePipe.transform(this.registerForm.value.dateOfBirth, 'yyyy-MM-dd'),
      "mobileNumber":this.registerForm.value.mobileNumber, "userPassword":this.registerForm.value.userPassword,
      "image":this.registerForm.value.image};
      this.loginService.registerUser(reqdata).subscribe((res:any)=>{
        console.log("registerUser ",res);
        this.loader.hideLoader();
        if(res.status=="success"){
         
          this.navctrl.navigateRoot(['/login'])
  
        }
      },(error)=>{
        console.log("validateLoginUser ",error)
        this.loader.hideLoader();
        this.loader.showToaster(error)

        // this.t
      })
  }

}
export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}