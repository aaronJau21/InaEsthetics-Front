import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../../../services/products.service';
import { IProductsResponse, IUpdateProductRequest } from '../../../interfaces';


@Component( {
  selector: 'app-update-product',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
} )
export class UpdateProductComponent implements OnInit {

  private readonly productService = inject( ProductsService );
  private readonly fb = inject( FormBuilder );
  private readonly dialog = inject( MatDialogRef<UpdateProductComponent> );

  data = inject( MAT_DIALOG_DATA );

  formGroup: FormGroup = this.fb.group( {
    nombre: [ '', Validators.required ],
    descripcion: [ '' ],
    precio: [ 0, [ Validators.required, Validators.min( 0 ) ] ]
  } );

  ngOnInit(): void {
    this.getProduct();
  };



  getProduct(): void {
    this.productService.getProductById( this.data.id ).subscribe( {
      next: product => this.formGroup.patchValue( product ),
      error: console.log
    } );
  }

  updateProduct(): void {

    const data = this.formGroup.value;

    this.productService.updateProduct( this.data.id, data ).subscribe( {
      next: () => this.dialog.close(),
      error: console.log
    } );
  }

}
