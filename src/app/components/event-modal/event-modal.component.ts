import { Component, Input, Signal } from '@angular/core';
import { Game } from '../../interfaces/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-modal',
  imports: [CommonModule],
  templateUrl: './event-modal.component.html',
  styleUrl: './event-modal.component.scss'
})
export class EventModalComponent {
  @Input() eventSig!: Signal<Game | null>;
  @Input() closeSig!: () => void;
}
