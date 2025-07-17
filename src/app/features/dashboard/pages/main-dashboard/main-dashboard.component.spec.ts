import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDashboardComponent } from './main-dashboard.component';
import {FinanceService} from '../../../../core/services/finance/finance.service';
import {FINANCE_PROVIDER} from '../../../../core/providers/finance.provider';
import {MockFinanceProvider} from '../../../../../mocks/FinanceProvider.mocks';
import {provideZonelessChangeDetection} from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

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
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainDashboardComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
