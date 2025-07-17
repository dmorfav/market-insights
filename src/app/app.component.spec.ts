import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterOutlet, AppComponent],
      providers: [provideZonelessChangeDetection()]
    });

    fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios después de crear el componente
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it('should have the title "marketInsights"', () => {
    expect(component.title).toEqual('marketInsights'); // Verifica que el título es correcto
  });

  it('should render the router outlet', () => {
    const outlet = fixture.debugElement.query(By.directive(RouterOutlet)); // Busca el RouterOutlet
    expect(outlet).toBeTruthy(); // Verifica que RouterOutlet está presente en el template
  });

  it('should disable context menu on document', () => {
    const preventDefaultSpy = jasmine.createSpy('preventDefault');
    const event = new MouseEvent('contextmenu', { bubbles: true });
    Object.defineProperty(event, 'preventDefault', { value: preventDefaultSpy });

    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
