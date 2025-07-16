import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {provideZonelessChangeDetection, signal} from "@angular/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: Router, useValue: mockRouter},
        provideZonelessChangeDetection()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login and navigate on successful login', () => {
    const loginResponse = signal(true);
    mockAuthService.login.and.returnValue(loginResponse);

    component['loginForm'].setValue({email: 'admin@example.com', password: 'admin123'});
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin@example.com', 'admin123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show alert on failed login', () => {
    const loginResponse = signal(false);
    mockAuthService.login.and.returnValue(loginResponse);

    spyOn(window, 'alert');
    component['loginForm'].setValue({email: 'invalid@example.com', password: 'wrongpassword'});
    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });
});
