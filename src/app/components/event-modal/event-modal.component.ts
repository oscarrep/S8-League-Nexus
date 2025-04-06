import { Component, computed, inject, Input, signal, Signal } from '@angular/core';
import { Game } from '../../interfaces/game';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddEditGameComponent } from "../add-edit-game/add-edit-game.component";

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule, RouterModule, AddEditGameComponent],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {
  @Input() eventSig!: Signal<Game | null>;
  @Input() onClose!: () => void;

  //@Input() editMode!: Signal<boolean>;
  editMode = signal(false);
  addMode = computed(() => !this.eventSig() || this.eventSig()?.id == null);

  private fb = inject(FormBuilder);
  eventForm: FormGroup;

  constructor(private _gameService: GameService) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      start: ['', Validators.required],
      end: [''],
      league: [''],
    })
  }

  toggleEditmode() { this.editMode.update(edit => !edit); }
  //toggleAddmode() { this.addMode.update(edit => !edit); }

  ngOnChanges() {
    if (this.eventSig()) {
      this.eventForm.patchValue({
        title: this.eventSig()!.title,
        description: this.eventSig()?.description || '',
        start: this._gameService.toDatetimeLocal(this.eventSig()!.start),
        end: this.eventSig() ? this._gameService.toDatetimeLocal(this.eventSig()?.end) : '',
        league: this.eventSig()?.league || '',
      })
    }
  }
}
