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

  registerUser(req:any){
    return  this.http.post(environment.register,req)
  }
  getMoviesData(page:any){
    return this.http.get(environment.movieData+page)
   }
   getMovieDetails(id:any){
    return this.http.get(`${environment.movieUrl}${id}?api_key=c7436e2513f4c04b9271bd03344dd0af`)
   }
   getUserData(payload:any){
    return this.http.post(environment.userData,payload)

   }
   

}
