import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../../app.store';

export const STORAGE_KEY = 'app_state';

export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);
    
    const shouldSaveAuth = action.type?.includes('[Auth]') || action.type === INIT || action.type === UPDATE;
    const shouldSaveProducts = action.type?.includes('[Product]') || action.type === INIT || action.type === UPDATE;
    
    if (shouldSaveAuth || shouldSaveProducts) {
      const currentStorage = localStorage.getItem(STORAGE_KEY);
      const storageState = currentStorage ? JSON.parse(currentStorage) : {};
      
      const newStorageState = { ...storageState };
      
      if (shouldSaveAuth && nextState.auth) {
        newStorageState.auth = { token: nextState.auth.token };
      }
      
      if (shouldSaveProducts && nextState.product) {
        newStorageState.product = { 
          products: nextState.product.products,
          error: null 
        };
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorageState));
    }

    return nextState;
  };
}

export function localStorageInitReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    if (action.type === INIT) {
      try {
        const storedState = localStorage.getItem(STORAGE_KEY);
        if (storedState) {
          const parsedState = JSON.parse(storedState);
          return { ...state, ...parsedState };
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return reducer(state, action);
  };
}