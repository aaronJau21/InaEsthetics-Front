import { Component } from '@angular/core';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IRoutes } from '../../interfaces';
import { RouterModule } from '@angular/router';

@Component( {
  selector: 'app-sab-nav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './sab-nav.component.html'
} )
export class SabNavComponent {

  public routes: IRoutes[] = [
    {
      path: '/layout',
      title: 'Inicio',
      icon: 'home'
    },
    {
      path: '/layout/products',
      title: 'Productos',
      icon: 'inventory'
    },
    // {
    //   path: '/layout/servicios',
    //   title: 'Servicios',
    //   icon: 'medical_services'
    // },
    // {
    //   path: '/layout/clientes',
    //   title: 'Clientes',
    //   icon: 'group'
    // }
  ];

}
