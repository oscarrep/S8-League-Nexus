import { Component, OnInit, inject } from '@angular/core';
import { Player } from '../../interfaces/player';
import { Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-list',
  imports: [RouterModule, LoadingComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  private _playerService = inject(PlayerService);
  loading: boolean = false;
  playerList: Player[] = [];

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPlayerList();
  }

  getPlayerList() {
    this.loading = true;
    this._playerService.getPlayerList().subscribe((data: Player[]) => {
      console.log(data);
      this.playerList = data;
      this.loading = false;
    })
  }

  deletePlayer(id: number) {
    this.loading = true;
    this._playerService.deletePlayer(id).subscribe(()=> {
      this.getPlayerList();
      this.toastr.warning(`Deleted player with id ${id}`, 'List Update');
    });
  }
}
