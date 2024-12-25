import {Component, inject, OnInit, signal} from '@angular/core';
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {SymbolCardComponent} from '../symbol-card/symbol-card.component';
import {ExSymbol} from '../../models/Interface/symbol';
import {FinanceService} from '../../../core/services/finance/finance.service';
import {SymbolCardSKComponent} from '../skeletons/symbol-card-sk/symbol-card-sk.component';

@Component({
  selector: 'app-symbol-list',
  imports: [
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    SymbolCardComponent,
    SymbolCardSKComponent
  ],
  templateUrl: './symbol-list.component.html',
  styleUrl: './symbol-list.component.scss',
  standalone: true
})
export class SymbolListComponent implements OnInit {
  protected symbolList = signal<ExSymbol[] | undefined>(undefined);
  protected favorites = new Set<string>();
protected placeholders = Array.from({ length: 50 }, (_, i) => i + 1);
  private readonly financeService = inject(FinanceService);



  ngOnInit(): void {
    this.loadSymbolList();
    this.loadFavorites();
  }

  isFavorite(symbol: ExSymbol): boolean {
    return this.favorites.has(symbol.displaySymbol);
  }

  toggleFavorite(symbol: ExSymbol): void {
    if (this.favorites.has(symbol.displaySymbol)) {
      this.favorites.delete(symbol.displaySymbol);
    } else {
      this.favorites.add(symbol.displaySymbol);
    }
    this.saveFavorites();
  }

  private loadSymbolList(): void {
    this.symbolList = this.financeService.getSymbolList();
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  private loadFavorites(): void {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favorites = new Set(JSON.parse(saved));
    }
  }

}
