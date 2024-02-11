import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.page.html',
  styleUrls: ['./detail-page.page.scss'],
})
export class DetailPagePage implements OnInit {
  id:number=0;
  data:any;
  constructor(private loaderService:LoaderService,private loginService:LoginService,private route: ActivatedRoute ) { 
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getMovieDetails(this.id)
    });
  }

  ngOnInit() {
  }
  getMovieDetails(id:any){
    this.loaderService.showLoader();
    this.loginService.getMovieDetails(id).subscribe((res:any)=>{
      console.log(res);
      this.data=res;
      this.loaderService.hideLoader();
    },(error)=>{
      this.loaderService.hideLoader();
      this.loaderService.showToaster(error)

    })
  }
}
