import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioEmpPage } from './anuncio-emp';

@NgModule({
  declarations: [
    AnuncioEmpPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioEmpPage),
  ],
})
export class AnuncioEmpPageModule {}
