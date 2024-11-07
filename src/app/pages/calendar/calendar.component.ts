import { CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  Component,
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCalendarComponent } from '../../components/event-calendar/event-calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentsModule } from "../../components/components.module";

const eventColor: any = {
  primary: '#1e90ff',
  secondary: '#D1E8FF',
  secondaryText: '#FFFFFF',
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule, CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {
  constructor(public dialog: MatDialog) { }

  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();

  currentMonth: number = new Date().getMonth();

  months = [
    { name: 'Jan', value: 0 },
    { name: 'Fev', value: 1 },
    { name: 'Mar', value: 2 },
    { name: 'Abr', value: 3 },
    { name: 'Mai', value: 4 },
    { name: 'Jun', value: 5 },
    { name: 'Jul', value: 6 },
    { name: 'Ago', value: 7 },
    { name: 'Set', value: 8 },
    { name: 'Out', value: 9 },
    { name: 'Nov', value: 10 },
    { name: 'Dez', value: 11 },
  ];

  events = [
    {
      start: new Date(),
      end: new Date(),
      title: 'Test Event for Today',
      color: eventColor,
      allDay: true,
    },
  ];

  openEventDialog(event: CalendarEvent): void {
    this.dialog.open(EventCalendarComponent, {
      data: event,
    });
  }

  onMonthChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const month = target.value ? +target.value : 0;
    this.viewDate = new Date(this.viewDate.getFullYear(), month, 1);
  }
}
