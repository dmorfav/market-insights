import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly mockUsers = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  private readonly loginStatus = signal(false);
  private readonly errorMessage = signal<string | null>(null);

  login(email: string, password: string): WritableSignal<boolean> {
    try {
      const user = this.mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('token', 'mock-jwt-token');
        this.loginStatus.set(true);
        this.errorMessage.set(null);
        return signal(true);
      } else {
        this.loginStatus.set(false);
        this.errorMessage.set('Credenciales incorrectas');
        return signal(false);
      }
    } catch (error) {
      this.loginStatus.set(false);
      this.errorMessage.set('Ocurrió un error durante la autenticación');
      console.error(error);
      return signal(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.loginStatus.set(false);
    this.errorMessage.set(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getErrorMessage(): WritableSignal<string | null> {
    return this.errorMessage;
  }

  getLoginStatus(): WritableSignal<boolean> {
    return this.loginStatus;
  }
}
