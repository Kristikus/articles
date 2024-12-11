import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, backendInterceptor, errorInterceptor } from '../tools/backend.interceptor';
import { finalize } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
  provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "enabled" })),
    provideHttpClient(withInterceptors([
      (req, next) => {
        document.body.classList.add("cursor-wait")
        return next(req).pipe(finalize(() => document.body.classList.remove("cursor-wait")))
      },
      backendInterceptor, 
      authInterceptor, 
      errorInterceptor]))
  ],
};
