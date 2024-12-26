import {inject, Injectable, WritableSignal} from '@angular/core';
import {FINANCE_PROVIDER} from '../../providers/finance.provider';
import {FinanceProviderInterface} from '../../../shared/models/Interface/finance-provider-interface';
import {HistoricalData} from '../../../shared/models/Interface/historical-data';
import {RealTimeData} from '../../../shared/models/Interface/real-time-data';
import {ExSymbol} from '../../../shared/models/Interface/symbol';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private readonly financeService = inject<FinanceProviderInterface>(FINANCE_PROVIDER);

  getDataBySymbol(symbol: string): WritableSignal<HistoricalData> {
    return this.financeService.getDataBySymbol(symbol);
  }

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    return this.financeService.getRealTimeData(symbol);
  }

  getSymbolList(): WritableSignal<ExSymbol[]> {
    return this.financeService.getSymbolList();
  }
}
