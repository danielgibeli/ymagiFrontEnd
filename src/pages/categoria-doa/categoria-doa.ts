import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDoaDTO } from '../../models/categoria.doa.dto';
import { CategoriaDoaService } from '../../services/domain/categoria.doa.service';

@IonicPage()
@Component({
  selector: 'page-categoria-doa',
  templateUrl: 'categoria-doa.html',
})
export class CategoriaDoaPage {
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  
  items: CategoriaDoaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaDoaService: CategoriaDoaService) 
  {
  }

  ionViewDidLoad() {
    this.categoriaDoaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  showDoacoes(categoriasdoa_id: string){
    this.navCtrl.setRoot('DoacaoPage', {categoriasdoa_id: categoriasdoa_id});
 }
} 