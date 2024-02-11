import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { HttpClientModule } from '@angular/common/http';
// import { ModalService } from '../services/modal.service';
import { LoginService } from '../services/login.service';
import { ModalService } from '../services/modal.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
          IonicModule,

       RegisterPageRoutingModule,

  ],
  declarations: [RegisterPage],
  providers:[LoginService,Geolocation,DatePipe]
})
export class RegisterPageModule {}
