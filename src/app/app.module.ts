import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CacheService } from './services/cache.service';
import { LoaderService } from './services/loader.service';
import { SharedModule } from './shared/shared/shared.module';
import { ModalService } from './services/modal.service';
import { LoginService } from './services/login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },CacheService,LoaderService,ModalService,LoginService],
  bootstrap: [AppComponent],
  exports:[SharedModule]
  

})
export class AppModule {}
