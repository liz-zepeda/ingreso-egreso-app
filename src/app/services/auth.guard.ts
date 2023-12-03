import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authService.service';
import { Observable, tap } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
    // return false;
    const router = inject(Router);
    return inject(AuthService)
    .isAuth().pipe(
      tap(estado => {       
        if (!estado) router.navigate(['/login'])  
      })
    )
  }
