import { provideZonelessChangeDetection } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { MockFinanceProvider } from '../../../../mocks/FinanceProvider.mocks';
import { MarketFacade } from '../../../core/facades/market.facade';
import { FINANCE_PROVIDER } from '../../../core/providers/finance.provider';
import { FinanceService } from '../../../core/services/finance/finance.service';

import { CandleWidgetComponent } from './candle-widget.component';

describe('CandleWidgetComponent', () => {
  let component: CandleWidgetComponent;
  let fixture: ComponentFixture<CandleWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleWidgetComponent],
      providers: [
        provideZonelessChangeDetection(),
        FinanceService,
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider },
        MarketFacade,
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandleWidgetComponent);
    component = fixture.componentInstance;
  });

  it('should display OHLC stats', async () => {
    fixture.componentRef.setInput('symbol', 'AAPL');
    fixture.detectChanges();
    await fixture.whenStable();

    const stats = fixture.nativeElement.querySelectorAll('.stats div');
    expect(stats.length).toBe(4);
  });
});
