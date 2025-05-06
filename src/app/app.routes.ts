import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticateUserComponent } from './pages/authenticate-user/authenticate-user.component';
import { SolicitationComponent } from './pages/solicitation/solicitation.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { authGuard, notLoggedGuard } from './shared/guards/auth.guard';
import { ListContadoresEmpresasComponent } from './pages/list-contadores-empresas/list-contadores-empresas.component';

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
    path: 'calendar/:idEvent',
    component: CalendarComponent,
    pathMatch: 'prefix',
    canActivate: [authGuard]
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: 'lista/contadores-empresas',
    component: ListContadoresEmpresasComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'user-auth',
    pathMatch: 'full'
  },
];
