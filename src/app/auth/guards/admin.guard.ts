import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { RoleEnum } from '../shared/interfaces';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map((user) => {
      // the role is checked manually because this guard is executed before the isAdmin value is set.
      if (user?.role.name !== RoleEnum.ADMIN) {
        router.navigateByUrl('/');
        return false;
      }

      return true;
    })
  );
};

export const adminGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};
