import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AnuncioEmpService } from '../../services/domain/anuncio.emp.service';
import { API_CONFIG } from '../../config/api.config';
import { AnuncioEmpDTO } from '../../models/anuncioemp.dto';

@IonicPage()
@Component({
  selector: 'page-empresa',
  templateUrl: 'empresa.html',
})
export class EmpresaPage {

  items : AnuncioEmpDTO[] = [];
  page : number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public anuncioEmpService: AnuncioEmpService,
    public loadingCtrl: LoadingController) {
    }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    this.anuncioEmpService.findByAnuncio(this.page, 20)
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
      let categoriasemp_id = this.navParams.get('categoriasemp_id');
      this.anuncioEmpService.findByCategoria(categoriasemp_id)
        .subscribe(response => {
          this.items = response['content'];
        },
        error => {});
    }
  */

  loadImageUrls(start: number, end: number) {
    for (var i=start; i<=end; i++) {
      let item = this.items[i];
      this.anuncioEmpService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrlAnuncioEmp = `${API_CONFIG.bucketBaseUrl}/aEmp${item.id}.jpg`;
      },
    error => {});
    }
  }

  abreCategoriasEmp(){
    this.navCtrl.push('CategoriaEmpPage');
  }

  showDetail(anuncioEmp_id : string) {
    this.navCtrl.push('AnuncioEmpPage',{anuncioEmp_id: anuncioEmp_id});
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