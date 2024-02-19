import { Component, inject, signal } from '@angular/core';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  gasolineraService = inject(GasolineraService);
  listaGasolinerasMunicipio = this.gasolineraService.listasGasolinerasPorMunicipio;
  tipoGasolinaSeleccionado = 'gasolina95';
  tipoOrdenSeleccionado = 'mayorMenor';
  selectChange = this.gasolineraService.selectChange;

  OnRadioChange(event: Event, tipo: string) {
    let radio = event.target as HTMLInputElement;
    if (tipo === 'gasolina') {
      this.tipoGasolinaSeleccionado = radio.value;
    } else if (tipo === 'orden') {
      this.tipoOrdenSeleccionado = radio.value;
    }
  }

  ngOnInit() {
    this.selectChange.subscribe({
      next: (data: any) => {
        this.listaGasolinerasMunicipio = data;
        console.log(this.listaGasolinerasMunicipio);
      }
    });
  }

  ordenarGasolineras() {
    
    console.log(this.listaGasolinerasMunicipio);
    if (this.tipoGasolinaSeleccionado && this.tipoOrdenSeleccionado) {
      let gasolineras = this.listaGasolinerasMunicipio;
      for (let i = 0; i < this.listaGasolinerasMunicipio.length; i++) {
        this.listaGasolinerasMunicipio[i].precioGasoleoA = gasolineras[i].precioGasoleoA.replace(',', '.');
        this.listaGasolinerasMunicipio[i].precioGasoleoB = gasolineras[i].precioGasoleoB.replace(',', '.');
        this.listaGasolinerasMunicipio[i].precioGasolina95 = gasolineras[i].precioGasolina95.replace(',', '.');
        this.listaGasolinerasMunicipio[i].precioGasolina98 = gasolineras[i].precioGasolina98.replace(',', '.');
      }
      switch (this.tipoGasolinaSeleccionado) {
        case 'GasoleoA':
          this.listaGasolinerasMunicipio = gasolineras.sort((a, b) => parseFloat(a.precioGasoleoA) - parseFloat(b.precioGasoleoA));
          console.log(this.listaGasolinerasMunicipio);
          break;
        case 'GasoleoB':
          this.listaGasolinerasMunicipio = gasolineras.sort((a, b) => parseFloat(a.precioGasoleoB) - parseFloat(b.precioGasoleoB));
          console.log(this.listaGasolinerasMunicipio);
          break;
        case 'Gasolina95':
          this.listaGasolinerasMunicipio = gasolineras.sort((a, b) => parseFloat(a.precioGasolina95) - parseFloat(b.precioGasolina95));
          console.log(this.listaGasolinerasMunicipio);
          break;
        case 'Gasolina98':
          this.listaGasolinerasMunicipio = gasolineras.sort((a, b) => parseFloat(a.precioGasolina98) - parseFloat(b.precioGasolina98));
          console.log(this.listaGasolinerasMunicipio);
          break;
        default:
          break;
      }
      if (this.tipoOrdenSeleccionado === 'mayorMenor') {
        console.log('mayorMenor');
        this.listaGasolinerasMunicipio.reverse();
        console.log(this.listaGasolinerasMunicipio);
      }
    }
  }


}
