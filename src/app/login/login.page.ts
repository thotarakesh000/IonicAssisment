import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm:FormGroup;
  constructor(public fb:FormBuilder,private loginService:LoginService,private cache:CacheService) { 
    this.loginForm=this.fb.group({
      emailForm:['',Validators.required],
      password:['',Validators.required],
      rememberMe:[false]
    })
  }
  get form(){
     return this.loginForm.controls
  }
  ngOnInit() {
    this.cache.setName("username","narenthecoder@gmail.com")
  }
  checkboxChange(event:any){
    console.log("event ",event)
  }
  loginWithPassword(){
    console.log(this.loginForm.valid,this.loginForm.value,this.cache.checkName());
    let reqdata={
      email:this.loginForm.value.emailForm,
      userPassword:this.loginForm.value.password,
    }
    this.loginService.validateLoginUser(reqdata).subscribe((res)=>{
      console.log("validateLoginUser ",res)
    },(error)=>{
      console.log("validateLoginUser ",error)

    })
  }
}
