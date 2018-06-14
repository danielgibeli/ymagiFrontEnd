import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnuncioInstService } from '../../services/domain/anuncio.inst.service';
import { AnuncioInstDTO } from '../../models/anuncioinst.dto';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-instituicao',
  templateUrl: 'instituicao.html',
})
export class InstituicaoPage {

  items : AnuncioInstDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public anuncioInstService: AnuncioInstService,
    public cartService: CartService,
    public loadingCtrl: LoadingController) {
  }
  
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.anuncioInstService.findByAnuncio(this.page, 20)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      loader.dismiss();
      console.log(this.page);
      console.log(this.items);
      this.loadImageUrls(start, end);
    },
    error => {
      loader.dismiss();
    });  
  }
/*
  ionViewWillEnter() {
    let categoriasinst_id = this.navParams.get('categoriasinst_id');
    this.anuncioInstService.findByCategoria(categoriasinst_id)
      .subscribe(response => {
        this.items = response['content'];
      },
      error => {});
  }
*/
  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.anuncioInstService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrlAnuncioInst = `${API_CONFIG.bucketBaseUrl}/aInst${item.id}.jpg`;
        },
    error => {});
    }
  }  

  showDetail(anuncioInst_id: string) {
    this.navCtrl.push('AnuncioInstPage', {anuncioInst_id: anuncioInst_id});
  }

  abreCategoriasInst(){
    this.navCtrl.push('CategoriaInstPage');
  }

  addToCart(anuncioInstituicao: AnuncioInstDTO) {
    this.cartService.addDoacao(anuncioInstituicao);
    this.navCtrl.push('CartPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}