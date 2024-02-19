import { Component, Input, inject, signal } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.model';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-card-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './card-map.component.html',
  styleUrl: './card-map.component.css'
})
export class CardMapComponent {

  gasolineraService = inject(GasolineraService);
  listaGasolinerasMunicipio = this.gasolineraService.listasGasolinerasPorMunicipio;
  selectChange = this.gasolineraService.selectChange;
  hayMunicipios = signal(false);
  key = this.gasolineraService.key;
  gasolinera = this.gasolineraService.getGasolinera();
  verInfo = signal(false);
  



  center: google.maps.LatLngLiteral = {lat: parseFloat(this.gasolinera.latitud) , lng: parseFloat(this.gasolinera.longitud)};
  zoom = 20;
  options : google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 40,
    minZoom: 8,
  };
  display: google.maps.LatLngLiteral  =  {lat: parseFloat(this.gasolinera.latitud) , lng: parseFloat(this.gasolinera.longitud)};


  ponerBotonenFalse(){
    this.gasolineraService.botonClickado.set(false);
  }

  verInfoGasolinera(){
    if(this.verInfo()){
      this.verInfo.set(false);
    }else{
      this.verInfo.set(true);
    }
  }


  ngOnInit() {
    console.log(this.gasolinera);
    this.selectChange.subscribe({
      next: (data: any) => {
        this.listaGasolinerasMunicipio = data;
        console.log(this.listaGasolinerasMunicipio);
        if (this.listaGasolinerasMunicipio.length != 0) {
          this.hayMunicipios.set(true);
        }
      }
    });
  }
}
