import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { AgendaAsideComponent } from '../../components/agenda-aside/agenda-aside.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { UserDataInterface } from '../../interfaces/user.interface';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    ComponentsModule,
    MatIconModule,
    AgendaAsideComponent,
    MatCardModule,
    MatButtonModule,
    LoadingScreenComponent,
    MatBadgeModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadingText: string = 'Carregando funcionalidades...';
  isLoading: boolean = true;
  userType!: string;
  userName!: string;
  notificationQuantity: number = 0;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    const userData = sessionStorage.getItem('userData');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.nameFormatter(parsedUserData);

      if (
        parsedUserData.tipoUsuario &&
        parsedUserData.tipoUsuario.descricao === 'contador'
      ) {
        this.userType = 'contador';
      } else {
        this.userType = 'empresa';
      }
    }

    this.isLoading = false;
  }

  handleOpenSolicitation() {
    this.router.navigate(['solicitation']);
  }

  goToCompanyAccountantsList() {
    this.router.navigate(['lista/contadores-empresas']);
  }

  handleOpenCalendar() {
    this.router.navigate(['calendar']);
  }

  nameFormatter(userData: UserDataInterface) {
    if (userData) {
      const fullName = userData.nome;
      if (fullName) {
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const secondName = nameParts[1] || '';
        const thirdName = nameParts[2] ? nameParts[2][0] + '.' : '';

        this.userName = `${firstName} ${secondName} ${thirdName}`.trim();
      }
    }
  }

  receiveNotificationsQuantity(notificationQuantity: number) {
    this.notificationQuantity = notificationQuantity;
  }
}
