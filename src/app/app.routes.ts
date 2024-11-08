import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticateUserComponent } from './pages/authenticate-user/authenticate-user.component';
import { SolicitationComponent } from './pages/solicitation/solicitation.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { authGuard, notLoggedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-auth',
    pathMatch: 'full'
  },
  {
    path: 'user-auth',
    component: AuthenticateUserComponent,
    pathMatch: 'full',
    canActivate: [notLoggedGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: 'solicitation',
    component: SolicitationComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'user-auth',
    pathMatch: 'full'
  },
];
