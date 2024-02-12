import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
  formSubmit:boolean=false;
  constructor(public fb:FormBuilder,private loginService:LoginService,
    private navctrl:NavController,private alertController: AlertController,
    private cache:CacheService,private platform:Platform,private loader:LoaderService) { 
    
    this.loginForm=this.fb.group({
      emailForm:['',Validators.compose([Validators.required,Validators.email])],
      password:['',Validators.required],
      rememberMe:[false]
    })
     this.loadFromCache()
    
  }
  get form(){
     return this.loginForm.controls
  }
  async loadFromCache(){
    let data:any=await this.cache.checkName("loginData");
    console.log(data);

    if(data){
      this.loginForm.patchValue({
        "emailForm":data.email,
        "password":data.userPassword
      })
    }else{
      this.loginForm.patchValue({
        "emailForm":null,
        "password":null
      })
    }
  }
  ngOnInit() {
  }
 async loginWithGoogle(){
    let googleUser = await GoogleAuth.signIn();
console.log("googleUser ",googleUser);
this.loader.showLoader();
let reqdata={
  email:googleUser.email,
}
this.loginService.validateLoginSocialUser(reqdata).subscribe((res:any)=>{
  console.log("validateLoginSocialUser ",res);
  this.loader.hideLoader();
  if(res.status=="success"){
        this.navctrl.navigateRoot(['/home'])

  }
},(error)=>{
  console.log("validateLoginSocialUser ",error)
  this.loader.hideLoader();
})
  }
  async checkboxChange(event:any){
    console.log("event ",(await this.cache.checkName("name")))
    
  }
  loginWithPassword(){
    console.log(this.loginForm.valid,this.loginForm.value);
    this.formSubmit=true;
   if(!this.loginForm.valid){
    return;
   }
    this.loader.showLoader();
    let reqdata={
      email:this.loginForm.value.emailForm,
      userPassword:this.loginForm.value.password,
    }
    this.loginService.validateLoginUser(reqdata).subscribe((res:any)=>{
      console.log("validateLoginUser ",res);
      this.loader.hideLoader();
      if(res.status=="success"){
        if(this.loginForm.value.rememberMe){
          this.cache.setName("loginData",reqdata);
          // this.cache.setName("email",reqdata.email);
        }else{
          this.cache.removeName("loginData");

        }
        this.navctrl.navigateRoot(['/home'])

      }
    },(error)=>{
      console.log("validateLoginUser ",error)
      this.loader.hideLoader();
    })
  }
  registerUser(){
    this.navctrl.navigateRoot(['/register'])

  }
}
