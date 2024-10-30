import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticateUserComponent } from './pages/authenticate-user/authenticate-user.component';

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
];
