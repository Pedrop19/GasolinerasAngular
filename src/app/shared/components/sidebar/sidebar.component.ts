import { Component, HostBinding, effect, inject, signal } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';
import { Gasolinera } from '../../models/gasolinera.model';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  gasolineraService = inject(GasolineraService);
  listasComunidades = this.gasolineraService.listaCCAA;
  listasProvincias = this.gasolineraService.listaProvincias;
  listasMunicipios = this.gasolineraService.listaMunicipios;
  listaGasolinerasMunicipio = this.gasolineraService.listasGasolinerasPorMunicipio;
  selectChange = this.gasolineraService.selectChange;

   
  ngOnInit() {
    this.gasolineraService.getCCAA().subscribe({
      next: (data: any) => { 
        let comunidades = data;
        let nombresComunidades = [];
        let idsComunidades: any[] = [];
        for (let i = 0; i < comunidades.length; i++) {
          nombresComunidades.push(comunidades[i].CCAA);
          idsComunidades.push(comunidades[i].IDCCAA);
        }
        console.log(comunidades);
        console.log(nombresComunidades);
        this.listasComunidades.set(
          nombresComunidades.map((nombre, index) => {
            return {
              nombre: nombre,
              id: idsComunidades[index]
            };
          })
        );
        console.log(this.listasComunidades());
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onChange(event : Event){
    let option = event.target as HTMLOptionElement;
    let id = option.value;

    this.gasolineraService.getProvincia(id).subscribe({
      next: (data: any) => { 
        let provincias = data;
        let nombresProvincias = [];
        let idsProvincias: any[] = [];
        for (let i = 0; i < provincias.length; i++) {
          nombresProvincias.push(provincias[i].Provincia);
          idsProvincias.push(provincias[i].IDPovincia);
        }
        console.log(provincias);
        console.log(nombresProvincias);
        this.listasProvincias.set(
          nombresProvincias.map((nombre, index) => {
            return {
              nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
              id: idsProvincias[index]
            };
          })
        );
        console.log(this.listasProvincias());
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onChangeProvincia(event : Event){
    let option = event.target as HTMLOptionElement;
    let id = option.value;
    
    this.gasolineraService.getMunicipios(id).subscribe({
      next: (data: any) => { 
        let municipios = data;
        let nombresMunicipios = [];
        let idsMunicipios: any[] = [];
        for (let i = 0; i < municipios.length; i++) {
          nombresMunicipios.push(municipios[i].Municipio);
          idsMunicipios.push(municipios[i].IDMunicipio);
        }
        console.log(municipios);
        console.log(nombresMunicipios);
        this.listasMunicipios.set(
          nombresMunicipios.map((nombre, index) => {
            return {
              nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
              id: idsMunicipios[index]
            };
          })
        );
        console.log(this.listasMunicipios());
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onChangeMunicipio(event : Event){
    let option = event.target as HTMLOptionElement;
    let id = option.value;
    console.log(id);
    
    this.gasolineraService.getGasolinerasPorMunicipio(id).subscribe({
      next: (data: any) => { 
        let gasolineras = data.ListaEESSPrecio;
        this.listaGasolinerasMunicipio = [];
        

        for (let i = 0; i < gasolineras.length; i++) {
          const gasolinera: Gasolinera = {
            id: String(gasolineras[i].IDMunicipio),
            municipio: gasolineras[i].Municipio,
            direccion: gasolineras[i].Dirección,
            precioGasoleoA: gasolineras[i]['Precio Gasoleo A'].replace(',', '.'),
            precioGasoleoB: gasolineras[i]['Precio Gasoleo B'].replace(',', '.'),
            precioGasolina95: gasolineras[i]['Precio Gasolina 95 E5'].replace(',', '.'),
            precioGasolina98: gasolineras[i]['Precio Gasolina 98 E5'].replace(',', '.'),
            latitud: gasolineras[i].Latitud.replace(',', '.'),
            longitud: gasolineras[i]['Longitud (WGS84)'].replace(',', '.')
          };
          this.listaGasolinerasMunicipio.push(gasolinera);
        }
        console.log(this.listaGasolinerasMunicipio);
        this.selectChange.next(this.listaGasolinerasMunicipio);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
