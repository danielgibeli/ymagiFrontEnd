import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioDoaPage } from './anuncio-doa';

@NgModule({
  declarations: [
    AnuncioDoaPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioDoaPage),
  ],
})
export class AnuncioDoaPageModule {}
