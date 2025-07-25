import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.store';
import { setToken, clearToken } from './auth.actions';
import { Observable } from 'rxjs';
import { STORAGE_KEY } from '../store/local-storage.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>) {}

  setAuthToken(token: string): void {
    this.store.dispatch(setToken({ token }));
    
    try {
      const currentState = localStorage.getItem(STORAGE_KEY);
      const state = currentState ? JSON.parse(currentState) : {};
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...state,
        auth: { ...state.auth, token }
      }));
    } catch (error) {
      console.error('Error saving token to localStorage', error);
    }
  }

  clearAuthToken(): void {
    this.store.dispatch(clearToken());
    
    try {
      const currentState = localStorage.getItem(STORAGE_KEY);
      if (currentState) {
        const state = JSON.parse(currentState);
        if (state.auth) {
          state.auth.token = null;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
      }
    } catch (error) {
      console.error('Error clearing token from localStorage', error);
    }
  }

  getAuthToken(): Observable<string | null> {
    return this.store.select(state => state.auth.token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(state => !!state.auth.token);
  }
}
