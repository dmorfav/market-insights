import { Injectable } from '@angular/core';
import type { EChartsOption } from 'echarts';

export interface CandlePoint {
  /** Unix timestamp (seconds) */
  readonly time: number;
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
}

export interface AreaPoint {
  /** Unix timestamp (seconds) */
  readonly time: number;
  readonly value: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChartFacadeService {
  /**
   * Creates an ECharts option object optimised for rendering a large candlestick series.
   * @param candles Array of candle data ordered by time ascending.
   */
  buildCandleOptions(candles: ReadonlyArray<CandlePoint>): EChartsOption {
    if (!candles.length) {
      return {};
    }

    const categoryData: number[] = [];
    const values: Array<[number, number, number, number]> = [];

    for (const c of candles) {
      categoryData.push(c.time * 1000); // echarts expects ms
      values.push([c.open, c.close, c.low, c.high]);
    }

    const option: EChartsOption = {
      animation: false,
      backgroundColor: 'transparent',
      grid: { left: 0, right: 0, top: 8, bottom: 24, containLabel: true },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: categoryData,
        boundaryGap: false,
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          formatter: (value: string) => {
            const ts = Number(value);
            return Number.isFinite(ts) ? new Date(ts).toLocaleDateString() : value;
          },
        },
      },
      yAxis: {
        scale: true,
        splitArea: { show: true },
      },
      series: [
        {
          type: 'candlestick',
          large: true, // utilise canvas large mode for performance
          largeThreshold: 2000,
          progressive: 2000,
          data: values,
          itemStyle: {
            color: '#26a69a',
            color0: '#ef5350',
            borderColor: '#26a69a',
            borderColor0: '#ef5350',
          },
        },
      ],
    };

    return option;
  }

  /**
   * Creates an ECharts option object for a smooth area (line) chart.
   * @param points Array of points ordered by time ascending.
   */
  buildAreaOptions(points: ReadonlyArray<AreaPoint>): EChartsOption {
    if (!points.length) {
      return {};
    }

    const data: Array<[number, number]> = points.map((p) => [p.time * 1000, p.value]);

    const option: EChartsOption = {
      animation: false,
      backgroundColor: 'transparent',
      grid: { left: 0, right: 0, top: 8, bottom: 24, containLabel: true },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'time',
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        scale: true,
        splitLine: { show: false },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 1, color: '#42a5f5' },
          areaStyle: {
            color: 'rgba(66,165,245,0.15)',
          },
          data,
        },
      ],
    };

    return option;
  }
} 