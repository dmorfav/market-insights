import { Injectable } from '@angular/core';

import {
  CandlePoint,
  AreaPoint,
  BoxplotPoint,
  TreemapNode
} from './chart-facade.service';

@Injectable({ providedIn: 'root' })
export class MockChartDataService {
  private readonly SECONDS = 60;

  generateCandles(count: number): CandlePoint[] {
    const nowSec = Math.floor(Date.now() / 1000);
    let lastClose = 100 + Math.random() * 50;
    const candles: CandlePoint[] = [];

    for (let i = count - 1; i >= 0; i--) {
      const time = nowSec - i * this.SECONDS;
      const open = lastClose;
      const high = open + Math.random() * 5;
      const low = open - Math.random() * 5;
      const close = low + Math.random() * (high - low);
      candles.push({
        time,
        open: this.round(open),
        high: this.round(high),
        low: this.round(low),
        close: this.round(close)
      });
      lastClose = close;
    }
    return candles;
  }

  generateAreaPoints(count: number): AreaPoint[] {
    const nowSec = Math.floor(Date.now() / 1000);
    let value = 100;
    const points: AreaPoint[] = [];
    for (let i = count - 1; i >= 0; i--) {
      const time = nowSec - i * this.SECONDS;
      value += (Math.random() - 0.5) * 2; // small random walk
      points.push({ time, value: this.round(value) });
    }
    return points;
  }

  generateAllocation(categories: number = 5): Array<{ name: string; value: number }> {
    const allocation: Array<{ name: string; value: number }> = [];
    let remaining = 100;
    for (let i = 0; i < categories - 1; i++) {
      const value = this.round(Math.random() * remaining);
      allocation.push({ name: `Asset ${i + 1}`, value });
      remaining -= value;
    }
    allocation.push({ name: `Asset ${categories}`, value: this.round(remaining) });
    return allocation;
  }

  generateBoxplotData(categories = 5): BoxplotPoint[] {
    const data: BoxplotPoint[] = [];
    for (let i = 0; i < categories; i++) {
      const arr = Array.from({ length: 50 }, () => Math.random() * 100).sort((a, b) => a - b);
      const values: [number, number, number, number, number] = [
        arr[0],
        arr[Math.floor(arr.length * 0.25)],
        arr[Math.floor(arr.length * 0.5)],
        arr[Math.floor(arr.length * 0.75)],
        arr[arr.length - 1]
      ];
      data.push({ name: `Cat ${i + 1}`, values });
    }
    return data;
  }

  generateViolinData(categories = 5): Array<{ name: string; values: number[] }> {
    const result: Array<{ name: string; values: number[] }> = [];
    for (let i = 0; i < categories; i++) {
      const values = Array.from({ length: 50 }, () => Math.random() * 100);
      result.push({ name: `Cat ${i + 1}`, values });
    }
    return result;
  }

  generateDonutSlices(categories = 5): Array<{ name: string; value: number }> {
    const slices = [] as Array<{ name: string; value: number }>;
    let remaining = 100;
    for (let i = 0; i < categories - 1; i++) {
      const val = this.round(Math.random() * remaining);
      slices.push({ name: `Slice ${i + 1}`, value: val });
      remaining -= val;
    }
    slices.push({ name: `Slice ${categories}`, value: this.round(remaining) });
    return slices;
  }

  generateTreeData(depth = 2, breadth = 3): TreemapNode[] {
    const makeNode = (level: number): TreemapNode => {
      if (level === depth) {
        return { name: `Leaf`, value: this.round(Math.random() * 100) };
      }
      return {
        name: `Node L${level}`,
        children: Array.from({ length: breadth }, () => makeNode(level + 1))
      };
    };
    return [makeNode(0)];
  }

  private round(v: number): number {
    return Math.round(v * 100) / 100;
  }
}
