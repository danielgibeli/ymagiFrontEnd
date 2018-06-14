import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DoacoesService } from '../../services/domain/doacoes.service';
import { CategoriaDoaService } from '../../services/domain/categoria.doa.service';
import { API_CONFIG } from '../../config/api.config';
import { DoacoesDTO } from '../../models/doacoes.dto';

@IonicPage()
@Component({
  selector: 'page-doacao',
  templateUrl: 'doacao.html',
})
export class DoacaoPage {

  items: DoacoesDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaDoaService: CategoriaDoaService,
    public doacoesService: DoacoesService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.doacoesService.findByAnuncio(this.page, 20)
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
/**
  ionViewWillEnter() {
    let categoriadoa_id = this.navParams.get('categoriadoa_id');
    this.doacoesService.findByCategoria(categoriadoa_id)
      .subscribe(response => {
        this.items = response['content'];   
      },
      error => {});
  }
*/

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.doacoesService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrlDoa = `${API_CONFIG.bucketBaseUrl}/doa${item.id}.jpg`;
        },
    error => {});
    }
  }

  abreCategoriasDoa() {
    this.navCtrl.push('CategoriaDoaPage');
  }

  showDetail(doacoes_id: string) {
    this.navCtrl.push('AnuncioDoaPage',{doacoes_id: doacoes_id});
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