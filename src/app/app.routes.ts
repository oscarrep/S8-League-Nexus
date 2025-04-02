import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { AddEditPlayerComponent } from './components/add-edit-player/add-edit-player.component';
import { AddEditGameComponent } from './components/add-edit-game/add-edit-game.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, },
    { path: 'players/add', component: AddEditPlayerComponent },
    { path: 'players/edit/:id', component: AddEditPlayerComponent },
    { path: 'map', component: MapComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'calendar/add', component: AddEditGameComponent },
    { path: 'calendar/edit/:id', component: AddEditGameComponent },
    { path: 'graphs', component: GraphsComponent },
    { path: '**', redirectTo: 'home' }
];
