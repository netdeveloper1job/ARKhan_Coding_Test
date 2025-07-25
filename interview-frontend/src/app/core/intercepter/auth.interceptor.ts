import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.store';
import { switchMap, take, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { STORAGE_KEY } from '../store/local-storage.reducer';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const store = inject(Store<AppState>);
  
  if (isPlatformBrowser(platformId)) {
    return store.select(state => state.auth.token).pipe(
      take(1),
      map(token => {
        if (!token) {
          try {
            const storedState = localStorage.getItem(STORAGE_KEY);
            if (storedState) {
              const parsedState = JSON.parse(storedState);
              token = parsedState.auth?.token || null;
            }
          } catch (e) {
            console.error('Error reading token from localStorage', e);
          }
        }

        if (token) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          return authReq;
        }
        
        return req;
      }),
      switchMap(modifiedReq => next(modifiedReq))
    );
  }
  
  return next(req);
};