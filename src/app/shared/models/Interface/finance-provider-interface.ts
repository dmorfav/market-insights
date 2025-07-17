import { WritableSignal } from '@angular/core';

import { HistoricalData } from './historical-data';
import { RealTimeData } from './real-time-data';
import { ExSymbol } from './symbol';

export interface FinanceProviderInterface {
  getSymbolList(): WritableSignal<ExSymbol[]>;
  getRealTimeData(symbol: string): WritableSignal<RealTimeData>;
  getDataBySymbol(symbol: string): WritableSignal<HistoricalData>;
}
