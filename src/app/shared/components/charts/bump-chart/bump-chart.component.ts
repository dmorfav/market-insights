import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, inject } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

import {
  ChartFacadeService,
  BumpSeries
} from '../../../../core/services/chart/chart-facade.service';

@Component({
  selector: 'app-bump-chart',
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
export class BumpChartComponent {
  data = input.required<readonly BumpSeries[]>();

  private readonly facade = inject(ChartFacadeService);

  readonly options = computed((): EChartsOption => this.facade.buildBumpOptions(this.data()));
}
