import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/domain/cart.service';
import { AnuncioInstService } from '../../services/domain/anuncio.inst.service';
import { CartItem } from '../../models/cart.item';
import { API_CONFIG } from '../../config/api.config';
import { AnuncioInstDTO } from '../../models/anuncioinst.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public doacaoService: AnuncioInstService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.doacaoService.getSmallImageFromBucket(item.anuncioInstituicao.id)
        .subscribe(response => {
          item.anuncioInstituicao.imageUrlAnuncioInst = `${API_CONFIG.bucketBaseUrl}/aInst${item.anuncioInstituicao.id}.jpg`;
        },
        error => {});
    }
  }
  
  removeItem(anuncioInstituicao: AnuncioInstDTO) {
    this.items = this.cartService.removeDoacao(anuncioInstituicao).items;
  }

  increaseQuantity(anuncioInstituicao: AnuncioInstDTO) {
    this.items = this.cartService.increaseQuantity(anuncioInstituicao).items;
  }

  decreaseQuantity(anuncioInstituicao: AnuncioInstDTO) {
    this.items = this.cartService.decreaseQuantity(anuncioInstituicao).items;
  }

  total() : number {
    return this.cartService.total();
  }  

  goOn() {
    this.navCtrl.setRoot('InstituicaoPage');
  }

  checkout() {
    this.navCtrl.push('PickAddressPage');
  }
}