import { Component, inject, Input, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-player',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-player.component.html',
  styleUrl: './add-edit-player.component.scss'
})
export class AddEditPlayerComponent implements OnInit {

  playersForm: FormGroup;
  private fb = inject(FormBuilder);
  addEdit: string = 'Add';
  @Input() playerSig!: Signal<Player | null>;

  constructor(private _playerService: PlayerService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {
    this.playersForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      team: ['', Validators.required],
      team_short: ['', Validators.required],
      position: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: [''],
    })
  }

  ngOnInit(): void {
    const player = this.playerSig?.();
    if (player) {
      this.addEdit = 'Edit';
      this.parsePlayer(player)
    }
  }

  addPlayer() {
    const player: Player = {
      username: this.playersForm.value.username,
      name: this.playersForm.value.name,
      team: this.playersForm.value.team,
      team_short: this.playersForm.value.team_short,
      position: this.playersForm.value.position,
      age: this.playersForm.value.age,
      country: this.playersForm.value.country,
      city: this.playersForm.value.city,
      lat: 0,
      lon: 0
    }

    if (this.playerSig && this.playerSig()?.id) {
      player.id = this.playerSig()?.id;
      this._playerService.updatePlayer(this.playerSig()?.id, player).subscribe(() => {
        this.toastr.info(`Player ${player.name} updated`, 'Player Updated');
        this.router.navigate(['/']);
      })
    }
    else {
      this._playerService.savePlayer(player).subscribe(() => {
        this.toastr.success(`Player ${player.name} registered to database`, 'Player Registered');
        this.router.navigate(['/']);
      })
    }
  }

  parsePlayer(player: Player) {

    this.playersForm.setValue({
      username: player.username,
      name: player.name,
      team: player.team,
      team_short: player.team_short,
      position: player.position,
      age: player.age,
      country: player.country,
      city: player.city,
    })

  }

}
