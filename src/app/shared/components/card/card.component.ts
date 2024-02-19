import { Component, HostBinding, Input, Output, effect, inject, signal } from '@angular/core';
import { Gasolinera } from '../../models/gasolinera.model';
import { DarkModeService } from '../../services/darkMode.service';
import { GasolineraService } from '../../services/gasolinera.service';
import { initFlowbite } from 'flowbite';
import { ParseFlags } from '@angular/compiler';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input({ required: true }) gasolinera!: Gasolinera;
  gasolineraService = inject(GasolineraService);
  
  darkService = inject(DarkModeService);
  darkMode = this.darkService.darkMode;
  botonClickado = this.gasolineraService.botonClickado;
  loading = this.gasolineraService.loading;
  llamadaDesdeMapa = this.gasolineraService.llamadaDesdeMapa;
  copiado = signal(false);

  ngOnInit() {
    initFlowbite();
  }

  copiarAlPortapapeles() {
    
    let texto = this.gasolinera.latitud + ',' + this.gasolinera.longitud;
    navigator.clipboard.writeText(texto);
    this.copiado.set(true);
   
  }
  enviarGasolinera(gasolinera: Gasolinera) {
    this.gasolineraService.setGasolinera(gasolinera);
    this.botonClickado.set(true);
  }
}
