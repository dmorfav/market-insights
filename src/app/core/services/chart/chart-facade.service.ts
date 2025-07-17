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

export interface LinePoint extends AreaPoint {}

export interface StackedAreaSeries {
  readonly name: string;
  readonly points: ReadonlyArray<AreaPoint>;
  readonly color?: string;
}

export interface BumpPoint {
  /** Unix timestamp (seconds) */
  readonly time: number;
  readonly rank: number;
}

export interface BumpSeries {
  readonly name: string;
  readonly points: ReadonlyArray<BumpPoint>;
  readonly color?: string;
}

export interface BoxplotPoint {
  readonly name: string;
  readonly values: [number, number, number, number, number]; // min, Q1, median, Q3, max
}

export type ViolinData = ReadonlyArray<number>;

export interface DonutSlice { name: string; value: number; }

export interface TreemapNode { name: string; value?: number; children?: TreemapNode[]; }

export interface SunburstNode { name: string; value?: number; children?: SunburstNode[]; }

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

  buildLineOptions(points: ReadonlyArray<LinePoint>): EChartsOption {
    if (!points.length) {
      return {};
    }

    const data: Array<[number, number]> = points.map((p) => [p.time * 1000, p.value]);

    return {
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
          lineStyle: { width: 2, color: '#42a5f5' },
          data,
        },
      ],
    } as EChartsOption;
  }

  buildStackedAreaOptions(series: ReadonlyArray<StackedAreaSeries>): EChartsOption {
    if (!series.length) {
      return {};
    }

    const timeAxis = series[0].points.map((p) => p.time * 1000);

    return {
      animation: false,
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: { show: true },
      grid: { left: 0, right: 0, top: 8, bottom: 24, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeAxis,
      },
      yAxis: {
        type: 'value',
        scale: true,
      },
      series: series.map((s) => ({
        name: s.name,
        type: 'line',
        stack: 'total',
        smooth: true,
        symbol: 'none',
        areaStyle: {},
        lineStyle: { width: 1 },
        itemStyle: s.color ? { color: s.color } : undefined,
        data: s.points.map((p) => p.value),
      })),
    } as EChartsOption;
  }

  buildBumpOptions(series: ReadonlyArray<BumpSeries>): EChartsOption {
    if (!series.length) {
      return {};
    }

    const timeAxis = series[0].points.map((p) => p.time * 1000);

    return {
      animation: false,
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: { show: true },
      grid: { left: 0, right: 0, top: 8, bottom: 24, containLabel: true },
      xAxis: {
        type: 'category',
        data: timeAxis,
      },
      yAxis: {
        type: 'value',
        inverse: true, // rank 1 at top
        min: 1,
        max: Math.max(...series.flatMap((s) => s.points.map((p) => p.rank))),
        splitLine: { show: false },
      },
      series: series.map((s) => ({
        name: s.name,
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { width: 2 },
        itemStyle: s.color ? { color: s.color } : undefined,
        data: s.points.map((p) => p.rank),
      })),
    } as EChartsOption;
  }

  buildBoxplotOptions(points: ReadonlyArray<BoxplotPoint>): EChartsOption {
    if (!points.length) return {};

    const categories = points.map(p => p.name);
    const data = points.map(p => p.values);

    return {
      animation: false,
      tooltip: { trigger: 'item' },
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value', scale: true },
      series: [
        {
          type: 'boxplot',
          data,
        },
      ],
    } as EChartsOption;
  }

  buildViolinOptions(datasets: ReadonlyArray<{ name: string; values: ViolinData }>): EChartsOption {
    if (!datasets.length) return {};

    const categories = datasets.map(d => d.name);
    // For simple representation, show as boxplot + scatter of values
    const boxData: number[][] = datasets.map(d => {
      const sorted = [...d.values].sort((a, b) => a - b);
      const q1 = sorted[Math.floor(sorted.length * 0.25)];
      const median = sorted[Math.floor(sorted.length * 0.5)];
      const q3 = sorted[Math.floor(sorted.length * 0.75)];
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      return [min, q1, median, q3, max];
    });

    const scatterData: number[][] = [];
    datasets.forEach((d, idx) => {
      d.values.forEach(v => scatterData.push([idx, v]));
    });

    return {
      tooltip: { trigger: 'item' },
      xAxis: { type: 'category', data: categories },
      yAxis: { type: 'value', scale: true },
      series: [
        { type: 'boxplot', data: boxData },
        { type: 'scatter', data: scatterData, symbolSize: 4, itemStyle: { opacity: 0.6 } },
      ],
    } as EChartsOption;
  }

  buildDonutOptions(slices: ReadonlyArray<DonutSlice>): EChartsOption {
    return {
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true, fontSize: 16, fontWeight: 'bold' } },
          data: slices.map(s => ({ ...s })),
        },
      ],
    } as EChartsOption;
  }

  buildTreemapOptions(data: ReadonlyArray<TreemapNode>): EChartsOption {
    return {
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'treemap',
          data: data as any,
          roam: false,
          nodeClick: false,
        },
      ],
    } as EChartsOption;
  }

  buildSunburstOptions(data: ReadonlyArray<SunburstNode>): EChartsOption {
    return {
      tooltip: { trigger: 'item' },
      series: [
        {
          type: 'sunburst',
          data: data as any,
          radius: [0, '90%'],
        },
      ],
    } as EChartsOption;
  }
} 