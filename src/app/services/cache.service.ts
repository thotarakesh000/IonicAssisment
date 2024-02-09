import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }
     async setName(key:any,value:any)  {
    await Preferences.set({
      key: key,
      value: value,
    });
  };
  
  async  checkName (){
    const { value } = await Preferences.get({ key: 'username' });
  
    console.log(`Hello ${value}!`);
  };
  
   removeName = async () => {
    await Preferences.remove({ key: 'name' });
  };
}
