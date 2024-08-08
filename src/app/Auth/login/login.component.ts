import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html'
} )
export class LoginComponent {
  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  public hiden = signal( true );


  public formLogin: FormGroup = this.fb.group( {
    user: [ '', Validators.required ],
    password: [ '', Validators.required ]
  } );

  clickEvent( event: MouseEvent ) {
    event.preventDefault();
    this.hiden.set( !this.hiden() );
    event.stopPropagation();
  }

  login() {
    const { user, password } = this.formLogin.value;
    this.authService.login( user, password ).subscribe( {
      next: () => this.router.navigateByUrl('/layout'),
      error: console.log
    } );

  }

}
