import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnuncioEmpDTO } from '../../models/anuncioemp.dto';
import { AnuncioEmpService } from '../../services/domain/anuncio.emp.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-anuncio-emp',
  templateUrl: 'anuncio-emp.html',
})
export class AnuncioEmpPage {

  item: AnuncioEmpDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaService: AnuncioEmpService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    let anuncioEmp_id = this.navParams.get('anuncioEmp_id');
    this.empresaService.findById(anuncioEmp_id)
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
    this.empresaService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrlAnuncioEmp = `${API_CONFIG.bucketBaseUrl}/aEmp${this.item.id}.jpg`;
      },
      error => {});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
