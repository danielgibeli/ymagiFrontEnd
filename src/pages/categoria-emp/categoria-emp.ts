import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaEmpService } from '../../services/domain/categoria.emp.service';
import { CategoriaEmpDTO } from '../../models/categoria.emp.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categoria-emp',
  templateUrl: 'categoria-emp.html',
})
export class CategoriaEmpPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaEmpDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaEmpService: CategoriaEmpService) {}
  
  ionViewDidLoad() {
    this.categoriaEmpService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});
  }

  showAnuncioEmp(categoriasemp_id: string){
      this.navCtrl.setRoot('EmpresaPage', {categoriasemp_id: categoriasemp_id});
  }
}