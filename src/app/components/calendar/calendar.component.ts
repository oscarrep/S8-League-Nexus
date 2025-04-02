import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarOptions: any;
  calendarEvents!: any[];
  loading: boolean = false;
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
      editable: true,
      selectable:true,
      themeSystem: 'bootstrap5'
    }

    this.getCalendarEvents();

  }

  getCalendarEvents() {
    this.loading = true;
    this._gameService.getGameList().subscribe((data: Game[]) => {
      console.log(data);
      this.calendarEvents = data;
      this.loading = false
    })
  }

}
