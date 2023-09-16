import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

// const checkAuthStatus = (): boolean | Observable<boolean> => {
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);

//   return authService.checkAuthStatus().pipe(
//     tap((isAuthenticated) => {
//       if (!isAuthenticated) router.navigateByUrl('/auth/login');
//     })
//   );
// };

export const adminGuard: CanActivateFn = (route, state) => {
  // return checkAuthStatus();
  const authService: AuthService = inject(AuthService);

  console.log(authService.isAdmin);

  return true;
};
