import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, Signal } from '@angular/core';
import { AddEditPlayerComponent } from '../add-edit-player/add-edit-player.component';
import { Router, RouterModule } from '@angular/router';
import { Player } from '../../interfaces/player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-modal',
  imports: [CommonModule, AddEditPlayerComponent, RouterModule],
  templateUrl: './player-modal.component.html',
  styleUrl: './player-modal.component.scss'
})
export class PlayerModalComponent {
  @Input() playerSig!: Signal<Player | null>;
  @Input() onClose!: () => void;

  @Input() editMode!: Signal<boolean>;
  @Input() setEditMode!: (value: boolean) => void;

  addMode = computed(() => !this.playerSig() || this.playerSig()?.id == null);

  private fb = inject(FormBuilder);
  playerForm: FormGroup;

  constructor(private _playerService: PlayerService, private router: Router, private toastr: ToastrService) {
    this.playerForm = this.fb.group({
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

  ngOnChanges() {
    if (this.playerSig()) {
      this.playerForm.patchValue({
        username: this.playerSig()!.username,
        name: this.playerSig()!.name,
        team: this.playerSig()!.team,
        team_short: this.playerSig()!.team_short,
        position: this.playerSig()!.position,
        age: this.playerSig()!.age,
        country: this.playerSig()!.country,
        city: this.playerSig()!.city || '',
      })
    }
  }

  toggleEditMode() { this.setEditMode(true); }

  deletePlayer() {
    if (this.playerSig()?.id) {
      this._playerService.deletePlayer(this.playerSig()!.id).subscribe({
        next: () => {
          this.toastr.success('Player deleted successfully', 'Player Deleted');
          this.onClose();
          this.router.navigate(['/players'])
        },
        error: (err) => {
          this.toastr.error('Failed to delete Player', 'Error' + err);
        }
      })
    }
  }
}
