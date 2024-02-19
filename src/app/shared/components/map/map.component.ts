import { Component, OnInit, SimpleChange, SimpleChanges, inject, signal } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule, GoogleMap, MapMarker, CardComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent{
  gasolineraService = inject(GasolineraService);
  listatodasLasGasolineras = this.gasolineraService.getAllGasolineras();
  listadeGasolineras = <Gasolinera[]>[];
  center: google.maps.LatLngLiteral = {lat: 40.166667 , lng: -3.520833};
  llamadaDesdeMapa = this.gasolineraService.llamadaDesdeMapa;
  gasolinera: any;
  loading = this.gasolineraService.loading;
  markerClicked = signal(false);
  zoom = 5.7;
  markers = <MapMarker[]>[];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 40,
    minZoom: 1,
  };
  latLng: google.maps.LatLngLiteral = {lat: 37.144750 , lng: -2.772778};

  // ...

  ngOnInit() {
    this.addMarker();
  }

  mostrarInfo(event: google.maps.MapMouseEvent) {
    this.loading.set(true);
    const informacion = new google.maps.InfoWindow();
    let gasolinera = this.listadeGasolineras.find((element) => {
      return element.latitud == event?.latLng?.lat()?.toString() && element.longitud == event?.latLng?.lng()?.toString();
    });
    const content = `
      <h2>${gasolinera?.municipio}</h2>
      <p>${gasolinera?.direccion}</p>
      <p>Precio Gasoleo A: ${gasolinera?.precioGasoleoA} €/l</p>
      <p>Precio Gasoleo B: ${gasolinera?.precioGasoleoB} €/l</p>
      <p>Precio Gasolina 95: ${gasolinera?.precioGasolina95} €/l</p>
      <p>Precio Gasolina 98: ${gasolinera?.precioGasolina98} €/l</p>
    `;
    this.gasolinera = gasolinera;
    console.log(gasolinera);
    informacion.setContent(content);
    informacion.setPosition(event.latLng);
    this.markerClicked.set(true);
    setTimeout(() => this.loading.set(false), 2000);
    this.llamadaDesdeMapa.set(true);
  }

  
  addMarker() {
    this.listatodasLasGasolineras.subscribe({
      next: (data: any) => {
        console.log(data);
        let gasolineras = data.ListaEESSPrecio;
        gasolineras.forEach((element: any) => {
          this.markers.push({
            position: {
              lat: parseFloat(element.Latitud.replace(',', '.')),
              lng: parseFloat(element['Longitud (WGS84)'].replace(',', '.')),
            },
            clickable: true,
          } as unknown as MapMarker);
          this.listadeGasolineras.push({
            id: String(element.IDMunicipio),
            municipio: element.Municipio,
            direccion: element.Dirección,
            precioGasoleoA: element['Precio Gasoleo A'].replace(',', '.'),
            precioGasoleoB: element['Precio Gasoleo B'].replace(',', '.'),
            precioGasolina95: element['Precio Gasolina 95 E5'].replace(',', '.'),
            precioGasolina98: element['Precio Gasolina 98 E5'].replace(',', '.'),
            latitud: element.Latitud.replace(',', '.'),
            longitud: element['Longitud (WGS84)'].replace(',', '.')
          });
        });


      }
    });
  }
}
