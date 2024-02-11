import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsentModalComponent } from '../consent-modal/consent-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ConsentModalComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[ConsentModalComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
