import { provideStore, MetaReducer } from '@ngrx/store';
import { authReducer, AuthState } from './core/auth';
import { productReducer, State as ProductState } from './core/store/product';
import { localStorageSyncReducer, localStorageInitReducer } from './core/store/local-storage.reducer';
import { isDevMode } from '@angular/core';

export interface AppState {
  auth: AuthState;
  product: ProductState;
}

export const metaReducers: MetaReducer<AppState>[] = [
  localStorageInitReducer,
  localStorageSyncReducer
];

export const appStoreProviders = [
  provideStore(
    { auth: authReducer, product: productReducer },
    { metaReducers }
  )
];