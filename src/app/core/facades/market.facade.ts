import { inject, Injectable, signal, computed, WritableSignal } from '@angular/core';
import { FinanceService } from '../services/finance/finance.service';
import { RealTimeData } from '../../shared/models/Interface/real-time-data';
import { HistoricalData } from '../../shared/models/Interface/historical-data';

@Injectable({ providedIn: 'root' })
export class MarketFacade {
  private readonly finance = inject(FinanceService);

  private readonly _selectedSymbol = signal<string>('AAPL');

  readonly selectedSymbol = this._selectedSymbol.asReadonly();

  readonly realTimeData = computed((): RealTimeData =>
    this.finance.getRealTimeData(this._selectedSymbol())()
  );

  readonly historicalData = computed((): HistoricalData =>
    this.finance.getDataBySymbol(this._selectedSymbol())()
  );

  selectSymbol(symbol: string): void {
    this._selectedSymbol.set(symbol);
  }

  readonly vm$ = computed(() => ({
    symbol: this._selectedSymbol(),
    realTime: this.realTimeData(),
    historical: this.historicalData(),
  }));
} 