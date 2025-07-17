import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { inject } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import {
  AreaPoint,
  ChartFacadeService
} from '../../../../core/services/chart/chart-facade.service';

@Component({
  selector: 'app-portfolio-area-chart',
  template: ` <div echarts [options]="options()" class="chart-container"></div> `,
  styles: [
    `
      .chart-container {
        width: 100%;
        height: 300px;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioAreaChartComponent {
  data = input.required<readonly AreaPoint[]>();

  private readonly chartFacade = inject(ChartFacadeService);

  readonly options = computed((): EChartsOption => {
    return this.chartFacade.buildAreaOptions(this.data());
  });
}
