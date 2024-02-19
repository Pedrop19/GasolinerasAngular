import { Injectable, inject, signal } from '@angular/core';
import { Gasolinera } from '../models/gasolinera.model';
import { HttpClient } from '@angular/common/http';
import { Subject, max } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  private http = inject(HttpClient);
  private gasolinera: any;

  listaCCAA = signal<any[]>([]);
  listaProvincias = signal<any[]>([]);
  listaMunicipios = signal<any[]>([]);
  listasGasolinerasPorMunicipio =  <Gasolinera[]>([]);
  loading = signal<boolean>(true);
  selectChange = new Subject<any>();
  listaGasolinerasMunicipio = new Subject<Gasolinera[]>();
  key = 'AIzaSyDa81izYHS2poSp-WuvbzPvF3zNRSUvUZ8';
  botonClickado = signal<boolean>(false);
  llamadaDesdeMapa = signal<boolean>(false);

  setGasolinera(gasolinera: Gasolinera) {
    this.gasolinera = gasolinera;
  }

  getGasolinera() {
    return this.gasolinera;
  }

  getAllGasolineras() {
    let url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/');
    return this.http.get(url.toString());
  }

  actualizarListaGasolinerasPorMunicipio(gasolineras: Gasolinera[]) {
    this.listasGasolinerasPorMunicipio = gasolineras;
  }


  getCCAA() {
    let url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/');
    return this.http.get(url.toString());
  }

  getProvincia(idCCAA: string) {
    let url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/' + idCCAA);
    return this.http.get(url.toString());
  }

  getMunicipios(idProvincia: string) {
    let url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/' + idProvincia);
    return this.http.get(url.toString());
  }

  getGasolinerasPorMunicipio(idMunicipio: string) {
    let url = new URL('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/' + idMunicipio);
    return this.http.get(url.toString());
  }
}
