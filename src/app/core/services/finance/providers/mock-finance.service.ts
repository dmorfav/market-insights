import { Injectable, signal, WritableSignal } from '@angular/core';
import {FinanceProviderInterface} from '../../../../shared/models/Interface/finance-provider-interface';
import {HistoricalData} from '../../../../shared/models/Interface/historical-data';
import {MockFinanceData} from '../../../../../mocks/MockFinanceData';
import {RealTimeData} from '../../../../shared/models/Interface/real-time-data';
import {ExSymbol} from '../../../../shared/models/Interface/symbol';

@Injectable({
  providedIn: 'root',
})
export class MockFinanceService implements FinanceProviderInterface {

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    return signal(MockFinanceData.createMockRealTimeData(symbol));
  }

  getSymbolList(): WritableSignal<ExSymbol[]> {
    return signal(MockFinanceData.createMockSymbols());
  }

  getDataBySymbol(symbol: string): WritableSignal<HistoricalData> {
    return signal(MockFinanceData.createDataBySymbol(symbol));
  }
}
