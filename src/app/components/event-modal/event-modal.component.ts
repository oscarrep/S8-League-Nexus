import { Component, Input, Signal } from '@angular/core';
import { Game } from '../../interfaces/game';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {
  @Input() eventSig!: Signal<Game | null>;
  @Input() onClose!: () => void;

  constructor(private _gameService:GameService){}
}
