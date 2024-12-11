import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanMatchFn = (route, segments) => {
  
  return inject(AuthService).isLogged || inject(Router).createUrlTree(['/login'])
};
