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
  secondaryText: '#FFFFFF', // Required property for EventColor type
};

// Use the event color with secondaryText defined

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
  constructor(
    public dialog: MatDialog
  ) { }



  // Method to open dialog with event details
  openEventDialog(event: CalendarEvent): void {
    this.dialog.open(EventCalendarComponent, {
      data: event,
    });
  }

  CalendarView = CalendarView

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events = [{
    start: new Date(), // Today's date
    end: new Date(), // Optional: end date can be the same for an all-day event
    title: 'Test Event for Today',
    color: eventColor, // Event colors
    allDay: true, // Displays the event as an all-day event
  },
  {
    start: new Date(Date.UTC(2024, 10, 3)),
    end: new Date(Date.UTC(2024, 10, 3)), // Optional: end date can be the same for an all-day event
    title: 'Botei fe em tu',
    color: '#D1E8FF', // Event colors
    allDay: true, // Displays the event as an all-day event
  }
    ,];
}
