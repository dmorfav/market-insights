import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    it('should authenticate a valid user', () => {
      const result = service.login('admin@example.com', 'admin123');
      expect(result()).toBeTrue();
      expect(service.getLoginStatus()()).toBeTrue();
      expect(service.getErrorMessage()()).toBeNull();
      expect(localStorage.getItem('token')).toBe('mock-jwt-token');
    });

    it('should reject a user with incorrect credentials', () => {
      const result = service.login('invalid@example.com', 'wrongpassword');
      expect(result()).toBeFalse();
      expect(service.getLoginStatus()()).toBeFalse();
      expect(service.getErrorMessage()()).toBe('Credenciales incorrectas');
      expect(localStorage.getItem('token')).toBeNull();
    });

    it('should handle errors gracefully and set an error message', () => {
      // Simulamos un error interno en la búsqueda de usuarios
      spyOn(service['mockUsers'], 'find').and.throwError('Simulated Error');

      const result = service.login('admin@example.com', 'admin123');

      // Asegúrate de que los valores devueltos y los estados reflejen el manejo del error
      expect(result()).toBeFalse();
      expect(service.getLoginStatus()()).toBeFalse();
      expect(service.getErrorMessage()()).toBe('Ocurrió un error durante la autenticación');
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear the state and the token on logout', () => {
      service.login('admin@example.com', 'admin123');
      service.logout();
      expect(service.getLoginStatus()()).toBeFalse();
      expect(service.getErrorMessage()()).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if there is a stored token', () => {
      localStorage.setItem('token', 'mock-jwt-token');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false if there is no stored token', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });
  });

  describe('getErrorMessage', () => {
    it('should return the current error message', () => {
      service.login('invalid@example.com', 'wrongpassword');
      expect(service.getErrorMessage()()).toBe('Credenciales incorrectas');
    });
  });

  describe('getLoginStatus', () => {
    it('should return the current login status', () => {
      service.login('admin@example.com', 'admin123');
      expect(service.getLoginStatus()()).toBeTrue();
    });
  });
});
