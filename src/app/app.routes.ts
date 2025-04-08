import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { PlayerListComponent } from './components/player-list/player-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'players', children: [
      { path: '', component: PlayerListComponent },
      { path: ':id', component: PlayerListComponent },
    ]
  },
  { path: 'map', component: MapComponent },
  {
    path: 'calendar',
    children: [
      { path: '', component: CalendarComponent },
      { path: ':id', component: CalendarComponent },
    ]
  },
  { path: 'graphs', component: GraphsComponent },
  { path: '**', redirectTo: 'home' }
];
