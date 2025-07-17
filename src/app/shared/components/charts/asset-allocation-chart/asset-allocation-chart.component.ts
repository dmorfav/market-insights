import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

interface Slice {
  name: string;
  value: number;
}

@Component({
  selector: 'app-asset-allocation-chart',
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
export class AssetAllocationChartComponent {
  data = input.required<readonly Slice[]>();

  readonly options = computed((): EChartsOption => {
    return {
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
          data: [...this.data()].map(s => ({ ...s, name: s.name }))
        }
      ]
    } as EChartsOption;
  });
}
