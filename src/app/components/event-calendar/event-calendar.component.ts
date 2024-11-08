import { Component, Inject } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [MatDialogModule, CommonModule],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.scss'
})
export class EventCalendarComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
