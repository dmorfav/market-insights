import { Component, input, output } from '@angular/core';

import { ExSymbol } from '../../models/Interface/symbol';

@Component({
  selector: 'app-symbol-card',
  imports: [],
  template: `
    <div
      class="symbol-card-common symbol-card"
      [class.favorite]="isFavorite()"
      (click)="onToggleFavorite()"
    >
      <h3 class="symbol-name">{{ symbol().displaySymbol }}</h3>
      <small class="symbol-small">{{ symbol().description }}</small>
    </div>
  `,
  styleUrl: './symbol-card.component.scss',
  standalone: true
})
export class SymbolCardComponent {
  symbol = input.required<ExSymbol>();
  isFavorite = input<boolean>(false);
  toggleFavorite = output();

  onToggleFavorite(): void {
    this.toggleFavorite.emit();
  }
}
