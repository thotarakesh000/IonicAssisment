import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient,) { }

  validateLoginUser(req:any){
   return this.http.post(environment.login,req)
  }


}
