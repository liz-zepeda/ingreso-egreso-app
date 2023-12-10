import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './authService.service';
import { Observable, take, tap } from 'rxjs';

export const authGuard: CanMatchFn = (): Observable<boolean> => {
  // return false;
  const router = inject(Router);
  return inject(AuthService)
  .isAuth().pipe(
    tap(estado => {       
      if (!estado) router.navigate(['/login'])  
    }),
    take(1)
  )
}
