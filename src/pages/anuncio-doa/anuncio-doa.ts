import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DoacoesDTO } from '../../models/doacoes.dto';
import { DoacoesService } from '../../services/domain/doacoes.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-anuncio-doa',
  templateUrl: 'anuncio-doa.html',
})
export class AnuncioDoaPage {

  item: DoacoesDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public doaService: DoacoesService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    let doacoes_id = this.navParams.get('doacoes_id');
    this.doaService.findById(doacoes_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  getImageUrlIfExists() {
    let loader = this.presentLoading();
    this.doaService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrlDoa = `${API_CONFIG.bucketBaseUrl}/doa${this.item.id}.jpg`;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
