import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { LoginResponse } from './interfaces/loginResponse';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  private readonly baseUrl: string = environment.API_URL;
  private readonly http = inject( HttpClient );

  login( user: string, password: string ): Observable<boolean> {

    const url = `${ this, this.baseUrl }/auth/login`;
    const body = { user, password };

    return this.http.post<LoginResponse>( url, body ).pipe(
      tap( ( { token } ) => {
        localStorage.setItem( 'token', token );
        localStorage.setItem( 'isAuth', 'true' );
      } ),
      map( () => true )
    );
  }

  isAuth(): Observable<boolean> {
    if ( !localStorage.getItem( 'token' ) || !localStorage.getItem( 'isAuth' ) ) return of( false );
    if ( localStorage.getItem( 'isAuth' ) !== 'true' ) return of( false );

    return of( true );
  }
}
