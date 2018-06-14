import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authService: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  profile() {
    this.navCtrl.push('ProfilePage');
  }

  logout() {
    this.authService.logout();
    this.navCtrl.setRoot('HomePage');
  }
}

