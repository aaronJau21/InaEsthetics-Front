import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, Subject, tap } from 'rxjs';
import { ICreateProductsResponse, IProductsRequest, IProductsResponse, IUpdateProductRequest } from '../interfaces';

@Injectable( {
  providedIn: 'root'
} )
export class ProductsService {
  private http = inject( HttpClient );
  private api_url: string = environment.API_URL;
  private token: string | null = localStorage.getItem( 'token' );
  private productUpdated = new Subject<void>();

  getProcutsUpdatedListener() {
    return this.productUpdated.asObservable();
  }

  getProducts(): Observable<IProductsResponse[]> {
    const url = `${ this.api_url }/products`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.get<IProductsResponse[]>( url, { headers } );

  }

  createProducts( data: IProductsRequest ): Observable<ICreateProductsResponse> {
    const url = `${ this.api_url }/products`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.post<ICreateProductsResponse>( url, data, { headers } );
  }

  getProductById( id: number ): Observable<IProductsResponse> {
    const url = `${ this.api_url }/products/${ id }`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.get<IProductsResponse>( url, { headers } );
  }

  updateProduct( id: number, data: IUpdateProductRequest ): Observable<IProductsResponse> {
    const url = `${ this.api_url }/products/${ id }`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.patch<IProductsResponse>( url, data, { headers } ).pipe(
      tap( () => this.productUpdated.next() )
    );
  }

  desactiveProduct( id: number ): Observable<IProductsResponse> {
    const url = `${ this.api_url }/products/desactive/${ id }`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.get<IProductsResponse>( url, { headers } );

  }

  activeProduct( id: number ): Observable<IProductsResponse> {
    const url = `${ this.api_url }/products/active/${ id }`;
    const headers = new HttpHeaders( {
      'Authorization': `Bearer ${ this.token }`
    } );

    return this.http.get<IProductsResponse>( url, { headers } );

  }

}
