import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { LinePoint } from '../../../../core/services/chart/chart-facade.service';

import { LineChartComponent } from './line-chart.component';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
  });

  it('should generate expected line chart options for provided data', async () => {
    const points: LinePoint[] = [
      { time: 1, value: 10 },
      { time: 2, value: 12 }
    ];

    fixture.componentRef.setInput('data', points);
    fixture.detectChanges();
    await fixture.whenStable();

    const options = component.options();
    expect((options.series as any[])[0].type).toBe('line');
    expect((options.series as any[])[0].data.length).toBe(2);
  });

  it('should render chart container in DOM', async () => {
    const points: LinePoint[] = [
      { time: 1, value: 10 },
      { time: 2, value: 12 }
    ];
    fixture.componentRef.setInput('data', points);
    fixture.detectChanges();
    await fixture.whenStable();

    const container = fixture.nativeElement.querySelector('.chart-container');
    expect(container).toBeTruthy();
  });
});
