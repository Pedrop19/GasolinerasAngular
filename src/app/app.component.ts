import { Component, HostBinding, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainsectionComponent } from './shared/components/mainsection/mainsection.component';
import { DarkModeService } from './shared/services/darkMode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, MainsectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PumpFinder';

  ngOnInit() {
    initFlowbite();
  }

  //const APIGOB = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/";

  darkService = inject(DarkModeService);
  darkMode = this.darkService.darkMode;

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor() {
    effect(() => {
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    });
  }
}
