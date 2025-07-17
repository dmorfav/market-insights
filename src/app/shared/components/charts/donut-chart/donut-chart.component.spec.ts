import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DonutChartComponent } from './donut-chart.component';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { DonutSlice } from '../../../../core/services/chart/chart-facade.service';

describe('DonutChartComponent', () => {
  let component: DonutChartComponent;
  let fixture: ComponentFixture<DonutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonutChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DonutChartComponent);
    component = fixture.componentInstance;
  });

  it('should create donut options', async () => {
    const slices: DonutSlice[] = [
      { name: 'A', value: 40 },
      { name: 'B', value: 60 },
    ];

    fixture.componentRef.setInput('data', slices);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.series as any[])[0].type).toBe('pie');
  });
}); 