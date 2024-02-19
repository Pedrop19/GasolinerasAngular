import { Component, HostBinding, effect, inject, signal } from '@angular/core';
import { DarkModeService } from '../../services/darkMode.service';
import { ModalComponent } from '../modal/modal.component';
import { GasolineraService } from '../../services/gasolinera.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  gasolineraService = inject(GasolineraService);
  darkService = inject(DarkModeService);
  darkMode = this.darkService.darkMode;
  listaGasolinerasMunicipio = this.gasolineraService.listasGasolinerasPorMunicipio;
  selectChange = this.gasolineraService.selectChange;
  hayMunicipios = signal(false);

  
  ngOnInit() {
    this.selectChange.subscribe({
      next: (data: any) => {
        this.listaGasolinerasMunicipio = data;
        console.log(this.listaGasolinerasMunicipio);
        if(this.listaGasolinerasMunicipio.length != 0){
          this.hayMunicipios.set(true);
        }
      }
    });
  }
}
