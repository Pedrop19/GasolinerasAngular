import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Gasolinera } from '../../models/gasolinera.model';
import { GasolineraService } from '../../services/gasolinera.service';
import { CardMapComponent } from '../card-map/card-map.component';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-mainsection',
  standalone: true,
  imports: [CardComponent, CardMapComponent, WelcomeComponent],
  templateUrl: './mainsection.component.html',
  styleUrl: './mainsection.component.css'
})
export class MainsectionComponent {

  gasolineraService = inject(GasolineraService);
  loading = this.gasolineraService.loading;
  selectChange = this.gasolineraService.selectChange;
  nohayGasolineras = signal(false);
  listaGasolinerasMunicipio = this.gasolineraService.listasGasolinerasPorMunicipio;
  botonClickado = this.gasolineraService.botonClickado;
  gasolinera = this.gasolineraService.getGasolinera();
  llamadaDesdeMapa = this.gasolineraService.llamadaDesdeMapa;
  primeravez = signal(true);


  ngOnInit() {

    //? Esto sirve para que cuando se cambie el select, se actualice la lista de gasolineras
    this.selectChange.subscribe({
      next: (data: any) => {
        this.primeravez.set(false);
        this.llamadaDesdeMapa.set(false);
        this.botonClickado.set(false);
        this.loading.set(true);
        console.log(this.loading());
        this.listaGasolinerasMunicipio = data;
        if (this.listaGasolinerasMunicipio.length === 0) {
          this.nohayGasolineras.set(true);
          setTimeout(() => this.loading.set(false), 2000);
        } else {
          this.nohayGasolineras.set(false);
          setTimeout(() => this.loading.set(false), 2000);
        }
      }
    });
  }
}
