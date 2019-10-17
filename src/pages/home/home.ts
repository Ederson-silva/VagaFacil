import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //Importando API Ionic Nativa

declare var google: any; //declarando variável para que possa ser iniciada no loadmap()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  map: any;
  markers:any;

  vaga = [
  {
    nome: 'vaga1',
    endereco: 'Endereço1',
    latitude: -27.0946564,
    longitude: -52.6230597
  },
  {
    nome: 'vaga2',
    endereco: 'Endereço2',
    latitude: -27.0931282,
    longitude: -52.6584219
  }];


  constructor(public navCtrl: NavController, public geolocation: Geolocation, public platform:Platform) {}

  // Aqui será iniciado o Mapa
  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.initPage();
    });
  }
// Geolocation vai pegar a posição atual do usuário
  initPage() {
    this.geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude); //passando latitudo e longitude
    });
  }

//Criando o mapa
  private loadMap(lat, lng) {
      let latLng = new google.maps.LatLng(lat, lng);

      let mapOptions = {
        center: latLng, //Quando carregar o mapa, o centro do mapa erá nossa posição
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP, //Tipo do mapa será terrestre
        disableDefaultUI: true,
      };

      let element = document.getElementById('map');

      this.map = new google.maps.Map(element, mapOptions);
      let marker = new google.maps.Marker({
        position: latLng,
        title: 'Minha Localização', // texto da minha localização
        animation: google.maps.Animation.DROP, // animação da minha localização
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' //tipo do icon da minha localização
      })
      let content = `
      <div id="myid"  class="item item-thumbnail-left item-text-wrap">
        <ion-item>
          <ion-row>
            <h6>`+marker.title+`</h6>
          </ion-row>
        </ion-item>
      </div>
      `// marker.title é o título que está no html para aparecer no marcador
      ;
      this.addInfoWindow(marker, content);
      marker.setMap(this.map);

      this.loadPoints();
    }

    loadPoints() { //Carregando as vagas no mapa que foram inseridas aqui no código fonte
      this.markers = [];

      for (const key of Object.keys(this.vaga)) { //Esse for pega cada vaga e seta no mapa
        console.log(this.vaga[key].nome )
        let latLng = new google.maps.LatLng(this.vaga[key].latitude, this.vaga[key].longitude);

        let marker = new google.maps.Marker({ //Criando os marcadores no mapa
          position: latLng,
          title: this.vaga[key].nome
        })
//Aqui quando clicar em cima do marcador poderá aparecer uma foto
        let content = `
        <div id="myid"  class="item item-thumbnail-left item-text-wrap">
          <ion-item>
            <ion-row>
              <h6>`+this.vaga[key].nome+`</h6> 
            </ion-row>
          </ion-item>
        </div>
        `
        ;
        this.addInfoWindow(marker, content);//Adicionando marcadores do mapa
        marker.setMap(this.map);
      }

      return this.markers;
    }

    addInfoWindow(marker, content) {
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', () => { //Quando clicar no marcador queremos
        infoWindow.open(this.map, marker);                   //que apareça descrição

        google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
          document.getElementById('myid').addEventListener('click', () => {
            this.goToEmpresa(marker)
          });
        });
      })
    }

    goToEmpresa(empresa) {
      alert('Click');
    }
}
