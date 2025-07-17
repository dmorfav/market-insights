import { inject, Injectable, signal, computed } from '@angular/core';

import { HistoricalData } from '../../shared/models/Interface/historical-data';
import { RealTimeData } from '../../shared/models/Interface/real-time-data';
import { FinanceService } from '../services/finance/finance.service';

@Injectable({ providedIn: 'root' })
export class MarketFacade {
  private readonly finance = inject(FinanceService);

  private readonly _selectedSymbol = signal<string>('AAPL');

  readonly selectedSymbol = this._selectedSymbol.asReadonly();

  readonly realTimeData = computed(
    (): RealTimeData => this.finance.getRealTimeData(this._selectedSymbol())()
  );

  readonly historicalData = computed(
    (): HistoricalData => this.finance.getDataBySymbol(this._selectedSymbol())()
  );

  selectSymbol(symbol: string): void {
    this._selectedSymbol.set(symbol);
  }

  readonly vm$ = computed(() => ({
    symbol: this._selectedSymbol(),
    realTime: this.realTimeData(),
    historical: this.historicalData()
  }));
}
