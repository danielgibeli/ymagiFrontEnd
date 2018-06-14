import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  instituicao: any = 'InstituicaoPage'
  doacao: any = 'DoacaoPage'
  empresa: any = 'EmpresaPage'

  config: any = 'ConfiguracoesPage'


  //tab1Root = InstituicaoPage;
  //tab2Root = DoacaoPage;
  //tab3Root = EmpresaPage;  

  constructor() {
  }
}
