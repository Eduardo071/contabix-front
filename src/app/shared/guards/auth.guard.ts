import type { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

export const notLoggedGuard: CanActivateFn = (route, state) => {
  return true;
};
