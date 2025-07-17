import { provideZonelessChangeDetection } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { MockFinanceProvider } from '../../../../../mocks/FinanceProvider.mocks';
import { FINANCE_PROVIDER } from '../../../../core/providers/finance.provider';
import { FinanceService } from '../../../../core/services/finance/finance.service';

import { MainDashboardComponent } from './main-dashboard.component';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainDashboardComponent],
      providers: [
        provideZonelessChangeDetection(),
        FinanceService, // Registrar el servicio bajo prueba
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider }, // Registrar el mock para el token
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
