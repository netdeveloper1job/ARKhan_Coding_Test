import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.store';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable, of, tap, catchError } from 'rxjs';
import * as ProductActions from '../store/product/product.actions';
import { loadProducts } from '../store/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private store: Store<AppState>,
    private http: HttpService
  ) {}

  getProducts(): Observable<any[]> {
    return this.store.select(state => state.product.products).pipe(
      tap(products => {
        if (!products || products.length === 0) {
          this.loadProductsFromApi();
        }
      })
    );
  }

  refreshProducts(): void {
    this.loadProductsFromApi();
  }

  private loadProductsFromApi(): void {
    this.store.dispatch(loadProducts());
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/products`, product).pipe(
      tap(response => {
        this.refreshProducts();
      }),
      catchError(error => {
        console.error('Error creating product', error);
        return of(null);
      })
    );
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/products/${id}`, product).pipe(
      tap(response => {
        this.refreshProducts();
      }),
      catchError(error => {
        console.error('Error updating product', error);
        return of(null);
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/products/${id}`).pipe(
      tap(response => {
        this.refreshProducts();
      }),
      catchError(error => {
        console.error('Error deleting product', error);
        return of(null);
      })
    );
  }
}