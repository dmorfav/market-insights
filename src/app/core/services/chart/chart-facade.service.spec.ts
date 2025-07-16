import { TestBed } from '@angular/core/testing';
import { ChartFacadeService, CandlePoint, AreaPoint } from './chart-facade.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('ChartFacadeService', () => {
  let service: ChartFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ChartFacadeService);
  });

  it('should create candlestick options with correct series type and colors', () => {
    const candles: CandlePoint[] = [
      { time: 1, open: 10, high: 15, low: 8, close: 12 },
      { time: 2, open: 12, high: 18, low: 11, close: 17 },
    ];

    const opts = service.buildCandleOptions(candles);
    expect(Array.isArray(opts.series)).toBeTrue();
    const series = (opts.series as any[])[0];
    expect(series.type).toBe('candlestick');
    expect(series.itemStyle.color).toBe('#26a69a');
    expect(series.itemStyle.color0).toBe('#ef5350');
    expect(series.data.length).toBe(2);
  });

  it('should create area chart options with correct series type', () => {
    const points: AreaPoint[] = [
      { time: 1, value: 100 },
      { time: 2, value: 110 },
    ];

    const opts = service.buildAreaOptions(points);
    expect(Array.isArray(opts.series)).toBeTrue();
    const series = (opts.series as any[])[0];
    expect(series.type).toBe('line');
    expect(series.areaStyle).toBeDefined();
    expect(series.data.length).toBe(2);
  });
}); 