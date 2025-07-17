import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SunburstChartComponent } from './sunburst-chart.component';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { SunburstNode } from '../../../../core/services/chart/chart-facade.service';

describe('SunburstChartComponent', () => {
  let component: SunburstChartComponent;
  let fixture: ComponentFixture<SunburstChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunburstChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SunburstChartComponent);
    component = fixture.componentInstance;
  });

  it('should create sunburst options', async () => {
    const data: SunburstNode[] = [
      {
        name: 'Root',
        children: [
          { name: 'Branch', value: 30 },
          { name: 'Branch 2', value: 70 },
        ],
      },
    ];

    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.series as any[])[0].type).toBe('sunburst');
  });
}); 