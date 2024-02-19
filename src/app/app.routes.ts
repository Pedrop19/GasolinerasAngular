import { Routes } from '@angular/router';
import { MapComponent } from './shared/components/map/map.component';
import { MainsectionComponent } from './shared/components/mainsection/mainsection.component';

export const routes: Routes = [
    { path: "map", component: MapComponent },
    { path: "",  component: MainsectionComponent }
];
