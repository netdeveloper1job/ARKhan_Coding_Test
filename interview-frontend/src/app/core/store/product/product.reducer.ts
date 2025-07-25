import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export interface State {
  products: any[];
  error: any;
}

export const initialState: State = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);