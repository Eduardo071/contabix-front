import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { AgendaAsideComponent } from '../../components/agenda-aside/agenda-aside.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadingText: string = 'Carregando funcionalidades...';
  isLoading: boolean = true;

  constructor(private readonly router: Router) {}
  ngOnInit(): void {
    this.isLoading = false;
  }

  handleOpenSolicitation() {
    this.router.navigate(['open-solicitation']);
  }
  handleOpenCalendar() {
    this.router.navigate(['calendar']);
  }
}
