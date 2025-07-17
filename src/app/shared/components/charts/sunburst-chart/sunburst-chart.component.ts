import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ChartFacadeService, SunburstNode } from '../../../../core/services/chart/chart-facade.service';

@Component({
  selector: 'app-sunburst-chart',
  template: ` <div echarts [options]="options()" class="chart-container"></div> `,
  styles: [
    `
      .chart-container {
        width: 100%;
        height: 300px;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SunburstChartComponent {
  data = input.required<readonly SunburstNode[]>();

  private readonly facade = inject(ChartFacadeService);

  readonly options = computed((): EChartsOption => this.facade.buildSunburstOptions(this.data()));
} 