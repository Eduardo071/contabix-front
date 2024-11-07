import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userAuth = sessionStorage.getItem('userData');

  if (!userAuth) {
    router.navigate(['/user-auth']);
    return false;
  }
  return true;
};

export const notLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userAuth = sessionStorage.getItem('userData');

  if (userAuth) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
