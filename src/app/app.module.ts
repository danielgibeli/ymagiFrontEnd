import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaInstService } from '../services/domain/categoria.inst.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { StorageService } from '../services/storage.service';
import { AuthInterceptorProvider } from '../config/auth-interceptor';
import { AnuncioInstService } from '../services/domain/anuncio.inst.service';
import { CategoriaEmpService } from '../services/domain/categoria.emp.service';
import { AnuncioEmpService } from '../services/domain/anuncio.emp.service';
import { CategoriaDoaService } from '../services/domain/categoria.doa.service';
import { DoacoesService } from '../services/domain/doacoes.service';
import { CartService } from '../services/domain/cart.service';
import { ImageUtilService } from '../services/image-util.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaInstService,
    CategoriaDoaService,
    CategoriaEmpService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    AnuncioInstService,
    AnuncioEmpService,
    DoacoesService,
    CartService,
    ImageUtilService
  ]
})
export class AppModule {}
