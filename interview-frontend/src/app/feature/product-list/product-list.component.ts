import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.store';
import { loadProducts } from '../../core/store/product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(private store: Store<AppState>, private productService: ProductService) {
    this.products$ = this.store.select(state => {
      const products = state.product?.products;
      return Array.isArray(products) ? products : [];
    });
    this.products$.subscribe(products => {
      console.log('Products from store:', products);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
        },
        error: (err: any) => {
          console.error('Error deleting product', err);
          alert('Failed to delete product');
        }
      });
    }
  }

  refreshProducts(): void {
    this.productService.refreshProducts();
  }
}
