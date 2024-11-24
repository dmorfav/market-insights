import {WritableSignal} from '@angular/core';
import {RealTimeData} from './real-time-data';
import {HistoricalData} from './historical-data';

export interface FinanceProviderInterface {
  getHistoricalData(symbol: string, startDate: string, endDate: string): WritableSignal<HistoricalData[]>;
  getRealTimeData(symbol: string): WritableSignal<RealTimeData>;
}
