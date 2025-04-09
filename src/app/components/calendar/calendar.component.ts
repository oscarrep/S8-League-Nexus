import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/game';
import { ModalComponent } from '../modal/modal.component';
import { EventClickArg } from '@fullcalendar/core/index.js';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterModule, FullCalendarModule, ModalComponent, CommonModule],
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

  date = signal(new Date().toISOString());

  constructor(private router: Router, private route: ActivatedRoute) { }

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
      dateClick: this.openAddModal.bind(this),
    }

    this.getCalendarEvents();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id === 'add') {
        this.selectedEvent.set({
          id: 0,
          title: '',
          description: '',
          start: '',
          end: '',
          league: ''
        });

        this.editMode.set(true);
        this.showEventModal.set(true);
      } else if (id) {
        this._gameService.getGame(Number(id)).subscribe(game => {
          this.selectedEvent.set(game);
          this.editMode.set(false);
          this.showEventModal.set(true);
        });
      }
    });

  }

  getCalendarEvents() {
    this._gameService.getGameList().subscribe((data: Game[]) => {
      this.calendarEvents = data;
    })
  }

  openModal(arg: EventClickArg): void {
    const event = arg.event;

    this.router.navigate(['/calendar', event.id]);

    this.selectedEvent.set({
      id: parseInt(event.id),
      title: event.title,
      description: event.extendedProps['description'],
      start: event.startStr,
      end: event.endStr,
      league: event.extendedProps['league'],
    });
    this.editMode.set(false);
    this.showEventModal.set(true);
  }

  openAddModal() {
    this.router.navigate(['calendar/add']);

    this.selectedEvent.set({
      title: '',
      description: '',
      start: '',
      end: '',
      league: ''
    });

    this.editMode.set(true);
    this.showAddEventModal.set(true);
  }

  closeModal = () => {
    this.router.navigate(['/calendar']);

    this.showEventModal.set(false);
    this.selectedEvent.set(null);
    this.editMode.set(false);
  }

  toggleEditMode() { this.editMode.update(value => !value); }

}
