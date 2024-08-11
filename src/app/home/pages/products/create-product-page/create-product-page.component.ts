import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { Router, RouterModule } from '@angular/router';

@Component( {
  selector: 'app-create-product-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './create-product-page.component.html',
  styleUrls: [ './create-product-page.component.css' ]
} )
export default class CreateProductPageComponent {
  private readonly fb = inject( FormBuilder );
  private readonly productsService = inject( ProductsService );
  private readonly router = inject( Router );

  imageSrc: string | ArrayBuffer | null | undefined = null;
  @ViewChild( 'fileInput' ) fileInput!: ElementRef<HTMLInputElement>;

  onFileChange( event: Event ) {
    const input = event.target as HTMLInputElement;
    if ( input.files && input.files[ 0 ] ) {
      const reader = new FileReader();
      reader.onload = ( e: ProgressEvent<FileReader> ) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL( input.files[ 0 ] );
    }
  }

  public createProductForm: FormGroup = this.fb.group( {
    nombre: [ '', Validators.required ],
    descripcion: [ '', Validators.required ],
    precio: [ 0, Validators.required ],
  } );

  public submitCreateProduct = () => {

    const data = this.createProductForm.value;

    this.productsService.createProducts( data ).subscribe( {
      next: () => this.router.navigateByUrl('/layout/products'),
      error: console.log
    } );
  };

}
