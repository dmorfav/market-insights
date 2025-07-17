import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { StackedAreaSeries } from '../../../../core/services/chart/chart-facade.service';

import { StackedAreaChartComponent } from './stacked-area-chart.component';

describe('StackedAreaChartComponent', () => {
  let component: StackedAreaChartComponent;
  let fixture: ComponentFixture<StackedAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedAreaChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StackedAreaChartComponent);
    component = fixture.componentInstance;
  });

  it('should generate stacked area options with multiple series', async () => {
    const series: StackedAreaSeries[] = [
      {
        name: 'Series A',
        points: [
          { time: 1, value: 10 },
          { time: 2, value: 15 }
        ]
      },
      {
        name: 'Series B',
        points: [
          { time: 1, value: 5 },
          { time: 2, value: 8 }
        ]
      }
    ];

    fixture.componentRef.setInput('data', series);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect(Array.isArray(opts.series)).toBeTrue();
    expect((opts.series as any[]).length).toBe(2);
    expect((opts.series as any[])[0].stack).toBe('total');
  });

  it('should render chart container in DOM', async () => {
    const series: StackedAreaSeries[] = [{ name: 'Series A', points: [{ time: 1, value: 10 }] }];
    fixture.componentRef.setInput('data', series);
    fixture.detectChanges();
    await fixture.whenStable();

    const container = fixture.nativeElement.querySelector('.chart-container');
    expect(container).toBeTruthy();
  });
});
