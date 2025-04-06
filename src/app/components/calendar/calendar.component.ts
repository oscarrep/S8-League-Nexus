import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/game';
import { EventModalComponent } from '../event-modal/event-modal.component';
import { EventClickArg } from '@fullcalendar/core/index.js';
import { AddEditGameComponent } from "../add-edit-game/add-edit-game.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterModule, FullCalendarModule, EventModalComponent, CommonModule, AddEditGameComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarOptions: any;
  calendarEvents!: any[];

  showEventModal = signal(false);
  showAddEventModal = signal(false);
  editMode = signal(false);

  selectedEvent = signal<Game | null>(null);
  private _gameService = inject(GameService);

  ngOnInit(): void {

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin],
      headerToolbar: {
        start: 'prev,next today',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      buttonText: {
        prev: '<',
        next: '>',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
      },
      dayMaxEvents: true,
      locale: enLocale,
      editable: false,
      selectable: true,
      themeSystem: 'bootstrap5',
      eventClick: this.openModal.bind(this),
    }

    this.getCalendarEvents();

  }

  getCalendarEvents() {
    this._gameService.getGameList().subscribe((data: Game[]) => {
      console.log(data);
      this.calendarEvents = data;
    })
  }

  openModal(arg: EventClickArg): void {
    const event = arg.event;
    this.selectedEvent.set({
      id: parseInt(event.id),
      title: event.title,
      description: event.extendedProps['description'],
      start: event.startStr,
      end: event.endStr,
      league: event.extendedProps['league'],
    });
    console.log(this.selectedEvent())
    this.editMode.set(true);
    this.showEventModal.set(true);
  }

  openAddEventModal() {
    this.selectedEvent.set(null);
    this.editMode.set(false);
    this.showEventModal.set(true);
  }

  closeModal = () => {
    this.showEventModal.set(false);
    this.selectedEvent.set(null);
    this.editMode.set(false);
  }

}
