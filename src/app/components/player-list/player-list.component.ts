import { Component, OnInit, inject } from '@angular/core';
import { Player } from '../../interfaces/player';
import { Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  imports: [RouterModule],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  private _playerService = inject(PlayerService);


  
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

  ngOnInit(): void {
   this.getPlayerList();
  }

  getPlayerList() {
    this._playerService.getPlayerList().subscribe(data => {
      console.log(data);
    })
  }
}
