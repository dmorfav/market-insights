import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import {
  ChartFacadeService,
  StackedAreaSeries
} from '../../../../core/services/chart/chart-facade.service';

@Component({
  selector: 'app-stacked-area-chart',
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
export class StackedAreaChartComponent {
  data = input.required<readonly StackedAreaSeries[]>();

  private readonly facade = inject(ChartFacadeService);

  readonly options = computed(
    (): EChartsOption => this.facade.buildStackedAreaOptions(this.data())
  );
}
