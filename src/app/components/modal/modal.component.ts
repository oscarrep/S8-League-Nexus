import { Component, Input, Signal } from '@angular/core';
import { Game } from '../../interfaces/game';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() eventSig!: Signal<Game | null>;
  @Input() closeSig!: () => void;
}
