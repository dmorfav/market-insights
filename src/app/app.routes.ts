import { Routes } from '@angular/router';
import {MainLayoutComponent} from './shared/layouts/main-layout/main-layout.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {AuthGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/main-dashboard/main-dashboard.component').then(m => m.MainDashboardComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  // Rutas para usuarios no autenticados
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
    ],
  },
  // Ruta por defecto
  { path: '**', redirectTo: '' },
];
