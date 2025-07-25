import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideEffects } from '@ngrx/effects';
import { loadProductsEffect } from './core/store/product';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './core/intercepter/auth.interceptor';

import { appStoreProviders } from './app.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    ...appStoreProviders,
    provideEffects({ loadProducts: loadProductsEffect }),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr(),
  ]
};