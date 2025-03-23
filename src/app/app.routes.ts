import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'map', component: MapComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: '**', redirectTo: 'home' }
];
