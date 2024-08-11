import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from '../../../services/products.service';
import { IProductsResponse } from '../../../interfaces';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-products-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterModule
  ],
  styleUrl: './products-page.component.css',
  templateUrl: './products-page.component.html',
} )
export default class ProductsPageComponent implements OnInit, OnDestroy {
  private productsService = inject( ProductsService );
  private router = inject( Router );
  private readonly dialog = inject( MatDialog );

  public products: IProductsResponse[] = [];
  private productsSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getProducts();
    this.productsSub.add(
      this.productsService.getProcutsUpdatedListener().subscribe( () => {
        this.getProducts();
      } )
    );
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }

  getProducts() {
    this.productsService.getProducts().subscribe( {
      next: ( products ) => this.products = products,
      error: error => {
        if ( error.error.statusCode === 401 ) {
          localStorage.removeItem( 'isAuth' );
          localStorage.removeItem( 'token' );
          this.router.navigateByUrl( '/login' );
        }

        console.log( error );
      }
    } );
  }

  displayedColumns: string[] = [ 'id', 'nombre', 'precio', 'acciones' ];

  openDialog( productId: number ): void {
    this.dialog.open( UpdateProductComponent, {
      data: { id: productId }
    } );
  }


  desactiveProduct( id: number ) {
    this.productsService.desactiveProduct( id ).subscribe( {
      next: () => this.getProducts(),
      error: console.log
    } );
  }

  activeProduct( id: number ) {
    this.productsService.activeProduct( id ).subscribe( {
      next: () => this.getProducts(),
      error: console.log
    } );
  }

}
