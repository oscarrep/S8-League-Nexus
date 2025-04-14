import { Component, computed, inject, Input, signal, Signal } from '@angular/core';
import { Game } from '../../interfaces/game';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEditGameComponent } from "../add-edit-game/add-edit-game.component";
import { ToastrService } from 'ngx-toastr';
import { Player } from '../../interfaces/player';
import { PlayerService } from '../../services/player.service';
import { AddEditPlayerComponent } from "../add-edit-player/add-edit-player.component";

@Component({
  selector: 'app-modal',
  imports: [CommonModule, RouterModule, AddEditGameComponent, AddEditPlayerComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() onClose!: () => void;
  @Input() editMode!: Signal<boolean>;
  @Input() setEditMode!: (value: boolean) => void;

  addMode = computed(() => !this._eventSig?.() || this._eventSig()?.id == null);
  form!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private _gameService = inject(GameService);
  private _playerService = inject(PlayerService);
  private _eventSig!: Signal<Game | null>;
  private _playerSig!: Signal<Player | null>;

  @Input() set eventSig(value: Signal<Game | null>) {
    this._eventSig = value;
    const game = value?.();
    if (game) {
      this.initGameForm();
      this.form.patchValue({
        title: game.title,
        description: game.description || '',
        start: this._gameService.toDatetimeLocal(game.start),
        end: game.end ? this._gameService.toDatetimeLocal(game.end) : '',
        league: game.league || '',
      });
    }
  }

  get eventSig() { return this._eventSig; }

  @Input() set playerSig(value: Signal<Player | null>) {
    this._playerSig = value;
    const player = value?.();
    if (player) {
      this.initPlayerForm();
      this.form.patchValue({
        username: player.username,
        name: player.name,
        team: player.team,
        team_short: player.team_short,
        position: player.position,
        age: player.age,
        country: player.country,
        city: player.city || '',
      });
    }
  }

  get playerSig() { return this._playerSig; }

  private initGameForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start: ['', Validators.required],
      end: [''],
      league: [''],
    });
  }

  private initPlayerForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      team: ['', Validators.required],
      team_short: ['', Validators.required],
      position: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: [''],
    });
  }

  toggleEditMode() { this.setEditMode(true); }

  deleteData() {
    if (this._eventSig?.()?.id) {
      this._gameService.deleteGame(this._eventSig()!.id).subscribe({
        next: () => {
          this.toastr.success('Event deleted successfully', 'Event Deleted');
          this.onClose();
          this.router.navigate(['/calendar']);
        },
        error: (err) => {
          this.toastr.error('Failed to delete event', 'Error: ' + err);
        },
      });
    } else if (this._playerSig?.()?.id) {
      this._playerService.deletePlayer(this._playerSig()!.id).subscribe({
        next: () => {
          this.toastr.success('Player deleted successfully', 'Player Deleted');
          this.onClose();
          this.router.navigate(['/players']);
        },
        error: (err) => {
          this.toastr.error('Failed to delete player', 'Error: ' + err);
        },
      });
    }
  }
}