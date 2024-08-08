import { Component } from '@angular/core';
import { SabNavComponent } from '../components/sab-nav/sab-nav.component';
import { RouterModule } from '@angular/router';

@Component( {
  selector: 'app-layouts',
  standalone: true,
  imports: [
    SabNavComponent,
    RouterModule
  ],
  templateUrl: './layouts.component.html'
} )
export default class LayoutsComponent {



}
