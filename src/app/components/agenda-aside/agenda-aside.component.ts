import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AgendaControllerService } from '../../services/agenda-controller.service';
import { UserDataInterface } from '../../interfaces/user.interface';
import { AgendaDataInterface } from '../../interfaces/agenda.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda-aside',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, CommonModule],
  templateUrl: './agenda-aside.component.html',
  styleUrl: './agenda-aside.component.scss',
})
export class AgendaAsideComponent implements OnInit {
  @Output() notificationQuantity = new EventEmitter<number>();

  userData: UserDataInterface = JSON.parse(
    sessionStorage.getItem('userData') ?? ''
  );
  notificationsList!: AgendaDataInterface[];
  message: string | null = null;

  constructor(
    private readonly agendaService: AgendaControllerService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.handleNotifications();
  }

  handleNotifications() {
    this.agendaService.getNotificationsByUser(this.userData).subscribe({
      next: (notifications: AgendaDataInterface[]) => {
        this.message = null;
        this.notificationsList = notifications;
        this.notificationQuantity.emit(notifications.length);
      },
      error: (err) => {
        this.message = err.error.message;
      },
    });
  }

  handleClickNotification(idEvento: number) {
    this.router.navigate(['calendar', idEvento]);
  }
}
