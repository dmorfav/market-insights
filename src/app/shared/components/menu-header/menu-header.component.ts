import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-header',
  imports: [MatToolbar, MatIcon, MatIconButton, MatButton],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
  standalone: true
})
export class MenuHeaderComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
