import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Plugin
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { Geolocation } from '@ionic-native/geolocation'

//Firebase config
import { firebaseConfig } from '../configs/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Providers
import { AuthProvider } from '../providers/auth';
import { FirebaseProvider } from '../providers/firebase';

//Pages
import { LoginPageModule } from '../pages/login/login.module';
//import { HomePageModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    //Pages
    BrowserModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    //HomePageModule,
    //Outros
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    AuthProvider,
    FirebaseProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMapsProvider,
    Geolocation    
  ]
})
export class AppModule {}
