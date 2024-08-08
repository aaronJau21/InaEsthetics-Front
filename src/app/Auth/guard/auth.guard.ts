import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = ( route, state ) => {

  const authService = inject( AuthService );
  const router = inject( Router );

  return authService.isAuth().pipe(
    switchMap( isAuth => {
      if ( isAuth ) {
        return of( true );
      } else {
        router.navigateByUrl('/login')
        return of( false );
      }
    } )
  );

};
