import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphsComponent } from './components/graphs/graphs.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'map', component: MapComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: '**', redirectTo: 'home' }
];
