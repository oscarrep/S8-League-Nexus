import { Component, OnInit, inject, signal } from '@angular/core';
import { Player } from '../../interfaces/player';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-player-list',
  imports: [RouterModule, ModalComponent],
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.scss'
})
export class PlayerListComponent implements OnInit {

  private _playerService = inject(PlayerService);
  playerList: Player[] = [];
  openModal = false;
  editPlayerId = 0;

  showPlayerModal = signal(false);
  showAddPlayerModal = signal(false);
  editMode = signal(false);

  selectedPlayer = signal<Player | null>(null);

  constructor(private toastr: ToastrService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._playerService.getPlayerList().subscribe((data: Player[]) => {
      this.playerList = data;
  
      const id = this.route.snapshot.paramMap.get('id');
      const addMode = this.router.url.endsWith('add');
  
      if (addMode) {
        this.openAddPlayerModal();
      } else if (id && !isNaN(+id)) {
        const player = this.playerList.find(player => player.id === +id);
        if (player) this.openPlayerModal(player);
      }
    });
  }

  getPlayerList() {
    this._playerService.getPlayerList().subscribe((data: Player[]) => {
      this.playerList = data;
    })
  }

  deletePlayer(id: number) {
    this._playerService.deletePlayer(id).subscribe(() => {
      this.getPlayerList();
      this.toastr.warning(`Deleted player with id ${id}`, 'List Update');
    });
  }

  openPlayerModal(player: Player): void {
    this.router.navigate(['/players', player.id]);
    this.selectedPlayer.set(player);
    this.showPlayerModal.set(true);
  }

  openAddPlayerModal() {
    this.router.navigate(['/players/add']);
    this.selectedPlayer.set({
      username: '',
      name: '',
      team: '',
      team_short: '',
      position: '',
      age: '',
      country: '',
      city: '',
      lat: 0,
      lon: 0
    });
    this.showPlayerModal.set(true);
  }

  closeModal() {
    this.router.navigate(['/players']);
  }

  toggleEditMode() { this.editMode.update(value => !value); }

}
