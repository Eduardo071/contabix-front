import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticateUserComponent } from './pages/authenticate-user/authenticate-user.component';
import { SolicitationComponent } from './pages/solicitation/solicitation.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

export const routes: Routes = [
  {
    path: 'user-auth',
    component: AuthenticateUserComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'open-solicitation',
    component: SolicitationComponent,
    pathMatch: 'full'
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full'
  },
];
