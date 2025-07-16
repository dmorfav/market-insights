import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioAreaChartComponent } from './portfolio-area-chart.component';
import { AreaPoint } from '../../../../core/services/chart/chart-facade.service';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

describe('PortfolioAreaChartComponent', () => {
  let component: PortfolioAreaChartComponent;
  let fixture: ComponentFixture<PortfolioAreaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAreaChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioAreaChartComponent);
    component = fixture.componentInstance;
  });

  it('should generate expected area chart options for provided data', async () => {
    const sample: AreaPoint[] = [
      { time: 1, value: 100 },
      { time: 2, value: 105 },
    ];

    fixture.componentRef.setInput('data', sample);
    fixture.detectChanges();
    await fixture.whenStable();

    const options = component.options();
    expect((options.series as any[])[0].type).toBe('line');
    expect((options.series as any[])[0].data.length).toBe(2);
  });
}); 