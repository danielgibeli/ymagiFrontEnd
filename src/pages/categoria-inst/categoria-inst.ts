import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaInstService } from '../../services/domain/categoria.inst.service';
import { CategoriaInstDTO } from '../../models/categoria.inst.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage() 
@Component({
  selector: 'page-categoria-inst',
  templateUrl: 'categoria-inst.html',
})
export class CategoriaInstPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  
  items: CategoriaInstDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaInstService: CategoriaInstService) {}

  ionViewDidLoad() {
    this.categoriaInstService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  showAnuncioInst(categoriasinst_id: string){
     this.navCtrl.setRoot('InstituicaoPage', {categoriasinst_id: categoriasinst_id});
  }
}