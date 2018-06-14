import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioInstPage } from './anuncio-inst';

@NgModule({
  declarations: [
    AnuncioInstPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioInstPage),
  ],
})
export class AnuncioInstPageModule {}
