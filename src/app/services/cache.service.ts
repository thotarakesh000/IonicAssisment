import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
     async setName(key:any,value:any)  {
      if(typeof(value)=="object"){
        value=  JSON.stringify(value)
      }
    await Preferences.set({
      key: key,
      value: value,
    });
  };
  
    checkName (key:any){
    return new Promise((resolve,reject)=>{
      Preferences.get({ key: key }).then((val)=>{
        if(val.value){
          resolve(JSON.parse(val.value))
        }
        else{
          resolve(null)

        }
      })
    })
 
  };
  
  async removeName  (name:any)  {
    await Preferences.remove({ key: name });
  };
}
