import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartService } from '../../services/domain/cart.service';
import { UsuarioService } from '../../services/domain/usuario.service';
import { DonativoDTO } from '../../models/donativo.dto';
import { CartItem } from '../../models/cart.item';
import { UsuarioDTO } from '../../models/usuario.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { DonativoService } from '../../services/domain/donativo.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  donativo: DonativoDTO;
  cartItems: CartItem[];
  usuario: UsuarioDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public usuarioService: UsuarioService,
    public donativoService: DonativoService) {

    this.donativo = this.navParams.get('donativo');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.usuarioService.findById(this.donativo.usuario.id)
      .subscribe(response => {
        this.usuario = response as UsuarioDTO;
        this.endereco = this.findEndereco(this.donativo.enderecoDeEntrega.id, response['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list: EnderecoDTO[]):EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('InstituicaoPage');
  }

  checkout() {
    this.donativoService.insert(this.donativo)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location'));
      },
      error => {
        if(error.status === 403) {
          this.navCtrl.setRoot('HomePage');
        }
    })
  }

  private extractId(location : string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}