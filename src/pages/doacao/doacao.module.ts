import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoacaoPage } from './doacao';

@NgModule({
  declarations: [
    DoacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(DoacaoPage),
  ],
})
export class DoacaoPageModule {}
