import { TestBed } from '@angular/core/testing';
import { ChartFacadeService, CandlePoint, AreaPoint, LinePoint, StackedAreaSeries, BumpSeries, BoxplotPoint } from './chart-facade.service';
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

  it('should create line chart options correctly', () => {
    const points: LinePoint[] = [
      { time: 1, value: 5 },
      { time: 2, value: 7 },
    ];
    const opts = service.buildLineOptions(points);
    const series = (opts.series as any[])[0];
    expect(series.type).toBe('line');
    expect(series.data.length).toBe(2);
  });

  it('should create stacked area options with two series', () => {
    const seriesInput: StackedAreaSeries[] = [
      { name: 'A', points: [{ time: 1, value: 2 }, { time: 2, value: 3 }] },
      { name: 'B', points: [{ time: 1, value: 1 }, { time: 2, value: 4 }] },
    ];
    const opts = service.buildStackedAreaOptions(seriesInput);
    expect((opts.series as any[]).length).toBe(2);
    expect((opts.series as any[])[0].stack).toBe('total');
  });

  it('should create bump chart options with inverse yAxis', () => {
    const seriesInput: BumpSeries[] = [
      { name: 'A', points: [{ time: 1, rank: 3 }, { time: 2, rank: 2 }] },
    ];
    const opts = service.buildBumpOptions(seriesInput);
    expect((opts.yAxis as any).inverse).toBeTrue();
    expect((opts.series as any[])[0].data[0]).toBe(3);
  });

  it('should build boxplot options', () => {
    const pts: BoxplotPoint[] = [
      { name: 'A', values: [1, 2, 3, 4, 5] },
    ];
    const opt = service.buildBoxplotOptions(pts);
    expect((opt.series as any[])[0].type).toBe('boxplot');
  });

  it('should build violin options', () => {
    const data = [
      { name: 'A', values: [1, 2, 3, 4, 5] },
    ];
    const opt = service.buildViolinOptions(data);
    expect(Array.isArray(opt.series)).toBeTrue();
  });
}); 