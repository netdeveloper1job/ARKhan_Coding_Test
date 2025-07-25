import { Routes } from '@angular/router';
import { featuresRoutes } from './feature/features.routes';

import { guestGuard } from './core/auth/guest.guard';
import { redirectGuard } from './core/auth/redirect.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    ...featuresRoutes,
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
            import('./auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register/register.component').then((m) => m.RegisterComponent),
    },

];
