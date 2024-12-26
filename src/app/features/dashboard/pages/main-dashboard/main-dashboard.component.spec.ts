import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardComponent } from './main-dashboard.component';
import {FinanceService} from '../../../../core/services/finance/finance.service';
import {FINANCE_PROVIDER} from '../../../../core/providers/finance.provider';
import {MockFinanceProvider} from '../../../../../mocks/FinanceProvider.mocks';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent],
      providers: [
        FinanceService, // Registrar el servicio bajo prueba
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider } // Registrar el mock para el token
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
