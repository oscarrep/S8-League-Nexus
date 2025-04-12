import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
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
export class CalendarComponent implements OnInit, AfterViewInit {
  calendarOptions: any;
  calendarEvents!: any[];
  @ViewChild('calendarRef', { static: false }) calendarRef!: FullCalendarComponent;

  showEventModal = signal(false);
  showAddEventModal = signal(false);
  editMode = signal(false);

  selectedEvent = signal<Game | null>(null);
  private _gameService = inject(GameService);

  date = signal(new Date().toISOString());

  smallButtons = {
    today: 'Now',
    month: 'M',
    week: 'W',
    day: 'D'
  };

  buttons = {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day'
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setCalendarOptions();
    this.getCalendarEvents();
    this.setAddEditMode();
  }

  ngAfterViewInit() {
    this.responsiveButtonText();
    window.addEventListener('resize', this.responsiveButtonText.bind(this));
  }

  setCalendarOptions() {
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
        today: this.buttons.today,
        month: this.buttons.month,
        week: this.buttons.week,
        day: this.buttons.day,
      },
      dayMaxEvents: true,
      locale: enLocale,
      editable: false,
      selectable: true,
      themeSystem: 'bootstrap5',
      eventClick: this.openModal.bind(this),
      dateClick: this.openAddModal.bind(this),
    }
  }

  setAddEditMode() {
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
      }
      else if (id) {
        this._gameService.getGame(Number(id)).subscribe(game => {
          this.selectedEvent.set(game);
          this.editMode.set(false);
          this.showEventModal.set(true);
        });
      }
    });
  }

  responsiveButtonText() {
    const buttonText = window.innerWidth < 768
      ? { prev: '<', next: '>', today: 'Now', month: 'M', week: 'W', day: 'D' }
      : { prev: '<', next: '>', today: 'Today', month: 'Month', week: 'Week', day: 'Day' };

    if (this.calendarOptions) this.calendarOptions.buttonText = buttonText;

    if (this.calendarRef) this.calendarRef.getApi().setOption('buttonText', buttonText);

  }

  getCalendarEvents() {
    this._gameService.getGameList().subscribe((data: Game[]) => {
      this.calendarEvents = data.map(event => ({
        ...event,
        color: this.getLeagueColor(event.league)
      }));
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

  getLeagueColor(league: string): string {
    switch (league) {
      case 'LEC': return '#19E4F9';
      case 'LCK': return '#1C192A';
      case 'LPL': return '#F40A0A';
      case 'LCP': return '#F68A4A';
      case 'LTAN': return '#317DEA';
      case 'LTAS': return '#D55A30';
      case 'WORLDS': return '#191919';
      case 'MSI': return '#FD0105';
      default: return '#888888';
    }
  }

}
