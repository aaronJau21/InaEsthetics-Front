import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { authGuard } from './Auth/guard/auth.guard';
import { inAuthGuard } from './Auth/guard/in-auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    // canActivate: [ inAuthGuard ],
    component: LoginComponent
  },
  {
    path: 'layout',
    loadComponent: () => import( './home/layouts/layouts.component' ),
    canActivate: [ authGuard ],
    children: [
      {
        path: '',
        loadComponent: () => import( './home/pages/home-page/home-page.component' )
      },
      {
        path: 'products',
        loadComponent: () => import( './home/pages/products/products-page/products-page.component' )
      },
      {
        path: 'products/create',
        loadComponent: () => import( './home/pages/products/create-product-page/create-product-page.component' )
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
