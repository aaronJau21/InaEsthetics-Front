import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProductsResponse } from '../interfaces';

@Injectable( {
  providedIn: 'root'
} )
export class ProductsService {
  private http = inject( HttpClient );
  private api_url: string = environment.API_URL;
  private token: string | null = localStorage.getItem( 'token' );

  getProducts(): Observable<IProductsResponse[]> {
    const url = `${ this.api_url }/products`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.get<IProductsResponse[]>( url, { headers } );

  }

}
