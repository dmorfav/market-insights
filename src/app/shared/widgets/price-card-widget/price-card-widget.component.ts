import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, inject, effect } from '@angular/core';
import { MatCard } from '@angular/material/card';

import { MarketFacade } from '../../../core/facades/market.facade';

@Component({
  selector: 'app-price-card-widget',
  template: `
    <mat-card *ngIf="vm$() as vm">
      <h2>{{ vm.symbol }}</h2>
      <p class="price">{{ vm.realTime.price | number: '1.2-2' }}</p>
      <p
        class="change"
        [ngClass]="{ positive: vm.realTime.change >= 0, negative: vm.realTime.change < 0 }"
      >
        {{ vm.realTime.change | number: '1.2-2' }}
      </p>
    </mat-card>
  `,
  styles: [
    `
      .price {
        font-size: 2rem;
        margin: 0;
      }
      .change {
        margin: 0;
      }
      .positive {
        color: #26a69a;
      }
      .negative {
        color: #ef5350;
      }
    `
  ],
  standalone: true,
  imports: [CommonModule, MatCard],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceCardWidgetComponent {
  symbol = input.required<string>();

  private readonly facade = inject(MarketFacade);

  constructor() {
    effect(() => {
      this.facade.selectSymbol(this.symbol());
    });
  }

  readonly vm$ = this.facade.vm$;
}
