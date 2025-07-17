import { provideZonelessChangeDetection } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { MockFinanceProvider } from '../../../../mocks/FinanceProvider.mocks';
import { MarketFacade } from '../../../core/facades/market.facade';
import { FINANCE_PROVIDER } from '../../../core/providers/finance.provider';
import { FinanceService } from '../../../core/services/finance/finance.service';

import { PriceCardWidgetComponent } from './price-card-widget.component';

describe('PriceCardWidgetComponent', () => {
  let component: PriceCardWidgetComponent;
  let fixture: ComponentFixture<PriceCardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceCardWidgetComponent],
      providers: [
        provideZonelessChangeDetection(),
        FinanceService,
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider },
        MarketFacade,
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCardWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should display provided symbol', async () => {
    fixture.componentRef.setInput('symbol', 'AAPL');
    fixture.detectChanges();
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toContain('AAPL');
  });
});
