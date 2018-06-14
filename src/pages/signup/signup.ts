import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { UsuarioService } from '../../services/domain/usuario.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  })
  export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadosService: EstadoService,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({

    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    tipo : ['1', [Validators.required]],
    cpfOuCnpj : ['', []],
    senha : ['', [Validators.required]],
    logradouro : ['',[]],
    numero : ['', []],
    complemento : ['', []],
    bairro : ['', []],
    cep : ['', []],
    telefone1 : ['', []],
    telefone2 : ['', []],
    telefone3 : ['', []],
    estadoId : [null, [Validators.required]],
    cidadeId : [null, [Validators.required]]      
    });
  }

  ionViewDidLoad(){
    this.estadosService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
    }

    updateCidades() {
      let estado_id = this.formGroup.value.estadoId;
      this.cidadeService.findAll(estado_id)
        .subscribe(response => {
          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
        },
      error => {});
    }

    signupUser() {
      this.usuarioService.insert(this.formGroup.value)
        .subscribe(response => {
          this.showInsertOk();
        },
        error => {});
    }
  
    showInsertOk() {
      let alert = this.alertCtrl.create({
        title: 'Sucesso',
        message: 'Cadastro Efetuado com Sucesso',
        enableBackdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }
}