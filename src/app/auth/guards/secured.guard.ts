import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('/auth/login');
        return false;
      }

      return true;
    })
  );
};

export const securedGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};
