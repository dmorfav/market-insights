import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { BoxplotPoint } from '../../../../core/services/chart/chart-facade.service';

import { BoxplotChartComponent } from './boxplot-chart.component';

describe('BoxplotChartComponent', () => {
  let component: BoxplotChartComponent;
  let fixture: ComponentFixture<BoxplotChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxplotChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoxplotChartComponent);
    component = fixture.componentInstance;
  });

  it('should create boxplot options', async () => {
    const data: BoxplotPoint[] = [
      { name: 'A', values: [1, 2, 3, 4, 5] },
      { name: 'B', values: [2, 3, 4, 5, 6] }
    ];

    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.series as any[])[0].type).toBe('boxplot');
  });
});
