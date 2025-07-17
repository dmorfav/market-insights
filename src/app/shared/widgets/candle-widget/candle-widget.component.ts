import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, computed, effect } from '@angular/core';
import { MatCard } from '@angular/material/card';

import { MarketFacade } from '../../../core/facades/market.facade';
import { CandlePoint } from '../../../core/services/chart/chart-facade.service';
import { MockChartDataService } from '../../../core/services/chart/mock-chart-data.service';
import { CandleChartComponent } from '../../components/charts/candle-chart/candle-chart.component';

@Component({
  selector: 'app-candle-widget',
  template: `
    <mat-card *ngIf="vm() as data" class="candle-widget">
      <h2>{{ data.symbol }}</h2>
      <section class="stats">
        <div><strong>Open:</strong> {{ data.open | number: '1.2-2' }}</div>
        <div><strong>High:</strong> {{ data.high | number: '1.2-2' }}</div>
        <div><strong>Low:</strong> {{ data.low | number: '1.2-2' }}</div>
        <div><strong>Close:</strong> {{ data.close | number: '1.2-2' }}</div>
      </section>
      <app-candle-chart class="chart" [candleData]="data.candles" />
    </mat-card>
  `,
  styles: [
    `
      .candle-widget {
        width: 100%;
      }
      .stats {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-bottom: 1rem;
      }
      .chart {
        width: 100%;
        height: 400px;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, MatCard, CandleChartComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandleWidgetComponent {
  symbol = input.required<string>();

  private readonly facade = inject(MarketFacade);
  private readonly mock = inject(MockChartDataService);

  constructor() {
    effect(() => this.facade.selectSymbol(this.symbol()));
  }

  private readonly candlesSignal = computed<readonly CandlePoint[]>(() =>
    this.mock.generateCandles(150)
  );

  readonly vm = computed(() => {
    const historical = this.facade.historicalData();

    const stats = {
      open: historical.open ?? 0,
      high: historical.high ?? 0,
      low: historical.low ?? 0,
      close: historical.close ?? 0
    } as const;

    return {
      ...stats,
      symbol: this.symbol(),
      candles: this.candlesSignal()
    };
  });
}
