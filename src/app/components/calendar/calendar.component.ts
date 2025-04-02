import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import enLocale from '@fullcalendar/core/locales/en-gb';

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
        today:'Today',
        month:'Month',
        week:'Week',
        day:'Day',
      },
      dayMaxEvents:true,
      locale: enLocale,
      editable: false,
      themeSystem: 'bootstrap5'
    }

    this.calendarEvents = [
      {
        title: 'Event',
        start: new Date(),
        description: 'qwe'
      },
      {
        title: 'Event2',
        start: new Date(),
        description: 'asdf'
      },
      {
        title: 'Event3',
        start: new Date(),
        description: 'zxc'
      }
    ]
  }
}
