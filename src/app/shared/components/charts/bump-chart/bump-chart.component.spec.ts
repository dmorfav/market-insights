import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BumpChartComponent } from './bump-chart.component';
import { BumpSeries } from '../../../../core/services/chart/chart-facade.service';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

describe('BumpChartComponent', () => {
  let component: BumpChartComponent;
  let fixture: ComponentFixture<BumpChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BumpChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BumpChartComponent);
    component = fixture.componentInstance;
  });

  it('should generate bump chart options with rank inversion', async () => {
    const series: BumpSeries[] = [
      {
        name: 'Series A',
        points: [
          { time: 1, rank: 2 },
          { time: 2, rank: 1 },
        ],
      },
    ];

    fixture.componentRef.setInput('data', series);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.yAxis as any).inverse).toBeTrue();
    expect((opts.series as any[])[0].data[0]).toBe(2);
  });

  it('should render chart container in DOM', async () => {
    const series: BumpSeries[] = [
      { name: 'Series A', points: [{ time: 1, rank: 1 }] },
    ];

    fixture.componentRef.setInput('data', series);
    fixture.detectChanges();
    await fixture.whenStable();

    const container = fixture.nativeElement.querySelector('.chart-container');
    expect(container).toBeTruthy();
  });
}); 