import { Injectable, signal, WritableSignal } from '@angular/core';
import { FinanceProviderInterface } from '../../../shared/models/Interface/finance-provider-interface';
import { HistoricalData } from '../../../shared/models/Interface/historical-data';
import { RealTimeData } from '../../../shared/models/Interface/real-time-data';
import {MockFinanceData} from '../../../../mocks/MockFinanceData';

@Injectable({
  providedIn: 'root',
})
export class MockFinanceServiceService implements FinanceProviderInterface {
  getHistoricalData(symbol: string, startDate: string, endDate: string): WritableSignal<HistoricalData[]> {
    return signal(MockFinanceData.createMockHistoricalData(symbol, startDate, endDate, 10));
  }

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    return signal(MockFinanceData.createMockRealTimeData(symbol));
  }
}
