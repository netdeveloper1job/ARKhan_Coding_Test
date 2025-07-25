import { createReducer, on } from '@ngrx/store';
import { setToken, clearToken } from './auth.actions';

export interface AuthState {
  token: string | null;
}

export const initialAuthState: AuthState = {
  token: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(setToken, (state, { token }) => ({ ...state, token })),
  on(clearToken, (state) => ({ ...state, token: null }))
);
