import { Component } from '@angular/core';
import { Player } from '../../interfaces/player';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-player-list',
  imports: [RouterModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent {
  playerList: Player[] = [
    {
      username: 'Myrwn',
      name: 'Alex Pastor Villarejo',
      position: 'Top Lane',
      age: '21',
      country: 'Spain',
      city: 'Badalona',
      team: 'Movistar KOI',
      id: 1
    },
    {
      username: 'Flakked',
      name: 'Victor Lirola Tortosa',
      position: 'Bot Lane',
      age: '21',
      country: 'Spain',
      city: 'Barcelona',
      team: 'Team Heretics',
      id: 2
    },

  ];
}
