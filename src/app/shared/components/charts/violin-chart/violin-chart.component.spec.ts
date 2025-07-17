import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxEchartsModule } from 'ngx-echarts';

import { ViolinChartComponent } from './violin-chart.component';

describe('ViolinChartComponent', () => {
  let component: ViolinChartComponent;
  let fixture: ComponentFixture<ViolinChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViolinChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') }))
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViolinChartComponent);
    component = fixture.componentInstance;
  });

  it('should create violin chart options with boxplot series', async () => {
    const datasets = [
      { name: 'A', values: [1, 2, 3, 4, 5, 6, 7] },
      { name: 'B', values: [2, 3, 3, 4, 5, 6, 8] }
    ];

    fixture.componentRef.setInput('data', datasets);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.series as any[])[0].type).toBe('boxplot');
  });
});
