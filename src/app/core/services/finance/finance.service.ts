import { inject, Injectable, WritableSignal } from '@angular/core';

import { FinanceProviderInterface } from '../../../shared/models/Interface/finance-provider-interface';
import { HistoricalData } from '../../../shared/models/Interface/historical-data';
import { RealTimeData } from '../../../shared/models/Interface/real-time-data';
import { ExSymbol } from '../../../shared/models/Interface/symbol';
import { FINANCE_PROVIDER } from '../../providers/finance.provider';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private readonly financeService = inject<FinanceProviderInterface>(FINANCE_PROVIDER);

  /**
   * Caché interna para los datos históricos por *symbol*.
   * Evita disparar múltiples peticiones HTTP al proveedor cuando varias
   * gráficas o componentes solicitan el mismo recurso.
   */
  private readonly historicalCache = new Map<string, WritableSignal<HistoricalData>>();

  /**
   * Caché interna para los datos en tiempo real por *symbol*.
   */
  private readonly realTimeCache = new Map<string, WritableSignal<RealTimeData>>();

  getDataBySymbol(symbol: string): WritableSignal<HistoricalData> {
    const cached = this.historicalCache.get(symbol);
    if (cached) {
      return cached;
    }

    const signal = this.financeService.getDataBySymbol(symbol);
    this.historicalCache.set(symbol, signal);
    return signal;
  }

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    const cached = this.realTimeCache.get(symbol);
    if (cached) {
      return cached;
    }

    const signal = this.financeService.getRealTimeData(symbol);
    this.realTimeCache.set(symbol, signal);
    return signal;
  }

  getSymbolList(): WritableSignal<ExSymbol[]> {
    return this.financeService.getSymbolList();
  }
}
