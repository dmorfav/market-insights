import {WritableSignal} from '@angular/core';
import {RealTimeData} from './real-time-data';
import {HistoricalData} from './historical-data';
import {ExSymbol} from './symbol';

export interface FinanceProviderInterface {
  getSymbolList(): WritableSignal<ExSymbol[]>;
  getRealTimeData(symbol: string): WritableSignal<RealTimeData>;
  getDataBySymbol(symbol: string): WritableSignal<HistoricalData>;
}
