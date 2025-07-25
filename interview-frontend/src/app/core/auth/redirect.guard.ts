import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const redirectGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<{ auth: AuthState }>);
  const router = inject(Router);
  let isAuthenticated = false;

  store.select('auth').subscribe(authState => {
    isAuthenticated = !!authState.token;
  }).unsubscribe();

  if (isAuthenticated) {
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};
