import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

//Aqui é o que o App vai iniciar quando for ligado
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('usuario')
      .then((usuario) => {
        console.log(usuario)
        if(usuario){
          this.rootPage = 'HomePage';
        }
        else {
          this.rootPage = 'LoginPage'
        }
      })
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

