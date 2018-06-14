import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnuncioInstDTO } from '../../models/anuncioinst.dto';
import { AnuncioInstService } from '../../services/domain/anuncio.inst.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-anuncio-inst',
  templateUrl: 'anuncio-inst.html',
})
export class AnuncioInstPage {

  item: AnuncioInstDTO;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public instituicaoService: AnuncioInstService,
    public cartService: CartService, 
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    let anuncioInst_id = this.navParams.get('anuncioInst_id');
    this.instituicaoService.findById(anuncioInst_id)
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
    this.instituicaoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrlAnuncioInst = `${API_CONFIG.bucketBaseUrl}/aInst${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(doacao: AnuncioInstDTO) {
    this.cartService.addDoacao(doacao);
    this.navCtrl.push('CartPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
