import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreemapChartComponent } from './treemap-chart.component';
import { provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { TreemapNode } from '../../../../core/services/chart/chart-facade.service';

describe('TreemapChartComponent', () => {
  let component: TreemapChartComponent;
  let fixture: ComponentFixture<TreemapChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreemapChartComponent],
      providers: [
        provideZonelessChangeDetection(),
        importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TreemapChartComponent);
    component = fixture.componentInstance;
  });

  it('should create treemap options', async () => {
    const data: TreemapNode[] = [
      {
        name: 'Root',
        children: [
          { name: 'Child A', value: 40 },
          { name: 'Child B', value: 60 },
        ],
      },
    ];

    fixture.componentRef.setInput('data', data);
    fixture.detectChanges();
    await fixture.whenStable();

    const opts = component.options();
    expect((opts.series as any[])[0].type).toBe('treemap');
  });
}); 