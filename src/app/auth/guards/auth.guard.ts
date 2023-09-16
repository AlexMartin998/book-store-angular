import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthStatus().pipe(
    tap((user) => {
      if (user) router.navigateByUrl('/');
    }),
    map((isAuth) => !isAuth)
  );
};
