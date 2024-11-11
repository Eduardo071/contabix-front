import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarModule,
  CalendarUtils,
  DateAdapter,
  CalendarEvent,
  CalendarView,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCalendarComponent } from '../../components/event-calendar/event-calendar.component';
import { MatDialog } from '@angular/material/dialog';
import { ComponentsModule } from '../../components/components.module';
import { AgendaControllerService } from '../../services/agenda-controller.service';
import { format, parseISO, startOfMonth } from 'date-fns';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MONTHS } from '../../shared/constants/constants';
import { MatCardModule } from '@angular/material/card';
import { UserDataInterface } from '../../interfaces/user.interface';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';
import { AgendaDataInterface } from '../../interfaces/agenda.interface';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

const eventColor = {
  primary: '#1e90ff',
  secondary: '#D1E8FF',
  secondaryText: '#FFFFFF',
} as const;

interface CustomCalendarEvent extends CalendarEvent {
  description?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    MatSelectModule,
    MatDividerModule,
    LoadingScreenComponent,
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private readonly service: AgendaControllerService,
    private readonly route: ActivatedRoute
  ) {
    this.getEventsByActualDayAndUsuario();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const eventId = Number(params.get('idEvent'));

      if (eventId) {
        this.service.getEventById(eventId).subscribe({
          next: (data: AgendaDataInterface) => {
            this.openEventDialog(data);
            this.isLoading = false;
          }
        });
      } else {
        this.getEventByMonth(format(this.viewDate, 'MM/yyyy'));
      }
    });
  }

  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );

  eventsToday: any[] = [];
  events: CustomCalendarEvent[] = [];
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  currentMonth: number = new Date().getMonth();
  months = MONTHS;

  selectedMonthName: string = this.months[this.currentMonth].name;

  loadingText: string = "Carregando Calendário...";
  isLoading: boolean = true;

  openEventDialog(event: CalendarEvent | AgendaDataInterface): void {
    this.dialog.open(EventCalendarComponent, {
      data: event,
    });
  }

  onMonthChange(event: MatSelectChange): void {
    const month = event.value;
    const currentYear = new Date().getFullYear();

    this.viewDate = startOfMonth(new Date(currentYear, month, 1));
    this.selectedMonthName = this.months[month].name;
    const dateMonthYearFormatted = format(this.viewDate, 'MM/yyyy');
    this.events = [];

    this.getEventByMonth(dateMonthYearFormatted);
  }

  getEventByMonth(dateMonthYearFormatted: string) {
    if (this.userData.idUsuario)
      this.service
        .getEventByMonth(dateMonthYearFormatted, this.userData.idUsuario)
        .subscribe({
          next: (data) => {
            this.events = data.map((event: any) => ({
              start: parseISO(event.dataEvento),
              end: parseISO(event.dataEvento),
              title: event.tipoEvento,
              description: event.descricao,
              color: eventColor,
              allDay: true,
            }));
            this.isLoading = false;
          }
        });
  }

  getEventsByActualDayAndUsuario() {
    if (this.userData.idUsuario)
      this.service
        .getEventsByActualDayAndUsuario(this.userData.idUsuario)
        .subscribe({
          next: (data) => {
            this.eventsToday = data;
          }
        });
  }

  handleClickTodayEvent(notification: any) {
    this.openEventDialog(notification);
  }
}
