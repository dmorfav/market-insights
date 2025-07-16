import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {SymbolCardComponent} from '../symbol-card/symbol-card.component';
import {ExSymbol} from '../../models/Interface/symbol';
import {FinanceService} from '../../../core/services/finance/finance.service';
import {SymbolCardSKComponent} from '../skeletons/symbol-card-sk/symbol-card-sk.component';
import {LocalService} from '../../../core/services/storage/local.service';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-symbol-list',
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    SymbolCardComponent,
    SymbolCardSKComponent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './symbol-list.component.html',
  styleUrl: './symbol-list.component.scss',
  standalone: true
})
export class SymbolListComponent implements OnInit {
  protected favorites = new Set<string>();
  protected onlyFavorites = signal(false);
  protected placeholders = Array.from({length: 50}, (_, i) => i + 1);

  private readonly financeService = inject(FinanceService);
  private readonly symbolListSignal = this.financeService.getSymbolList();

  protected symbolList = computed(() => {
    const allSymbols = this.symbolListSignal();
    if (this.onlyFavorites()) {
      return allSymbols.filter((symbol: ExSymbol) => this.favorites.has(symbol.displaySymbol));
    }
    return allSymbols;
  });


  ngOnInit(): void {
    this.loadFavorites();
  }

  protected isFavorite(symbol: ExSymbol): boolean {
    return this.favorites.has(symbol.displaySymbol);
  }

  protected toggleFavorite(symbol: ExSymbol): void {
    if (this.favorites.has(symbol.displaySymbol)) {
      this.favorites.delete(symbol.displaySymbol);
    } else {
      this.favorites.add(symbol.displaySymbol);
    }
    this.saveFavorites();
  }

  protected showOnlyFavorites(): void {
    this.onlyFavorites.set(!this.onlyFavorites());
  }

  private saveFavorites(): void {
    LocalService.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  private loadFavorites(): void {
    const saved = LocalService.getItem('favorites');
    if (saved) {
      this.favorites = new Set(JSON.parse(String(saved)));
    }
  }

}
