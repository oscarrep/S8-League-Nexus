import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
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
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      headerToolbar: {
        start: 'prev,next',
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      locale: enLocale,
      editable: false
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
