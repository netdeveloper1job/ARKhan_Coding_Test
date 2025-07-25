import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpService } from '../../service/http.service';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

export const loadProductsEffect = createEffect(
  (actions$ = inject(Actions), http = inject(HttpService)) => {
    return actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        http.get<any>(`${environment.apiUrl}/products`).pipe(
          map((response) => {
            const products = response?.data || [];
            return ProductActions.loadProductsSuccess({ products });
          }),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);