import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterOutlet, AppComponent]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Detectar cambios después de crear el componente
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();  // Verifica que el componente se crea correctamente
  });

  it('should have the title "marketInsights"', () => {
    expect(component.title).toEqual('marketInsights');  // Verifica que el título es correcto
  });

  it('should render the router outlet', () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet));  // Busca el RouterOutlet
    expect(outlet).toBeTruthy();  // Verifica que RouterOutlet está presente en el template
  });
});
