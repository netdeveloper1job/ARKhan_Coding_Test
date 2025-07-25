import { Routes } from '@angular/router';
import { authGuard } from '../core/auth/auth.guard';

export const featuresRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature.component').then((m) => m.FeatureComponent),
    children: [
      {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'product-list',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./product-list/product-list.component').then((m) => m.ProductListComponent)
      },
      {
        path: 'add-product',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./product-create/product-create.component').then((m) => m.ProductCreateComponent)
      },
      {
        path: 'edit-product/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./product-create/product-create.component').then((m) => m.ProductCreateComponent)
      }
    ]
  }
];
