import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { LoginService } from '../services/login.service';
import { InfiniteScrollCustomEvent, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  themeToggle = false;
  page=1;
  userData:any=null;
  items:any[]=[];
  constructor(private loaderService:LoaderService,private loginService:LoginService,private navCtrl:NavController) {}
  ngOnInit(): void {   
   this.getUserData();
  }
  
  toggleChange(ev:any) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd:any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
 async getMoviesList(){
    try{
  //  await this.loaderService.showLoader();
  //   let loaderPresent=await this.loadingCtrl.create({});
  //  await loaderPresent.present();
    this.loginService.getMoviesData(this.page).subscribe(async (res:any)=>{
      console.log(res);
      this.loaderService.hideLoader();
      // await loaderPresent.dismiss();
      this.items=[...this.items,...res?.results];
        },async (error) =>{
          console.log(error)
           this.loaderService.hideLoader();
           this.loaderService.showToaster(error)

    })
  }catch(ex){
    console.log("exception ",ex)
  }
  }
  handleRefresh(event:any) {
    this. page=1;
    this.items=[];
    setTimeout(() => {
      // Any calls to load data go here
      this.getMoviesList();
      event.target.complete();
    }, 2000);
  }

  showImageData(item:any){
    this.navCtrl.navigateRoot([`home/detail`,item.id]);

  }
  getUserData(){
    this.loaderService.showLoader();
    this.userData=null;
    let reqData={email: "narenthecoder@gmail.com"}
    this.loginService.getUserData(reqData).subscribe((res:any)=>{
      console.log("res",res);
      this.userData=res.data[0];
      this.getMoviesList();
    },(error)=>{
      this.loaderService.hideLoader();
      this.loaderService.showToaster(error)
    })
  }
  logout(){
    this.navCtrl.navigateRoot(['/login']);
  }
  onIonInfinite(ev:any) {
    this.getMoviesList();
    this.page+=1;
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
