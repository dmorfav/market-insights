import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { CandlePoint } from '../../../../core/services/chart/chart-facade.service';

import { CandleChartComponent } from './candle-chart.component';

describe('CandleChartComponent', () => {
  let component: CandleChartComponent;
  let fixture: ComponentFixture<CandleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandleChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CandleChartComponent);
    component = fixture.componentInstance;
  });

  it('should generate expected candlestick options for provided data', async () => {
    const sample: CandlePoint[] = [
      { time: 1, open: 10, high: 15, low: 8, close: 12 },
      { time: 2, open: 12, high: 18, low: 11, close: 17 }
    ];

    fixture.componentRef.setInput('candleData', sample);
    fixture.detectChanges();
    await fixture.whenStable();

    const options = component.options();
    expect((options.series as any[])[0].type).toBe('candlestick');
    expect((options.series as any[])[0].data.length).toBe(2);
  });
});
