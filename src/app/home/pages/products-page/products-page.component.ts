import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { IProductsResponse } from '../../interfaces';
import { ProductsService } from '../../services/products.service';
import { MatButtonModule } from '@angular/material/button';

@Component( {
  selector: 'app-products-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  styleUrl: './products-page.component.css',
  templateUrl: './products-page.component.html',
} )
export default class ProductsPageComponent implements OnInit {
  private productsService = inject( ProductsService );

  public products: IProductsResponse[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe( {
      next: ( products ) => this.products = products,
      error: console.log
    } );
  }

  displayedColumns: string[] = [ 'id', 'nombre', 'precio', 'acciones' ];
  

}
