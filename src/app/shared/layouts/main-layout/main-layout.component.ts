import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuHeaderComponent } from '../../components/menu-header/menu-header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MenuHeaderComponent],
  template: `
    <app-menu-header />
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .content {
        padding: 16px;
      }
    `
  ]
})
export class MainLayoutComponent {}
