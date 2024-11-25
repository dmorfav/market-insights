import {Injectable, signal, WritableSignal} from '@angular/core';
import {FinanceProviderInterface} from '../../../shared/models/Interface/finance-provider-interface';
import {HistoricalData} from '../../../shared/models/Interface/historical-data';
import {RealTimeData} from '../../../shared/models/Interface/real-time-data';

@Injectable({
  providedIn: 'root'
})
export class FinnhubServiceService implements FinanceProviderInterface {

  getHistoricalData(symbol: string, startDate: string, endDate: string): WritableSignal<HistoricalData[]> {
    return signal([]);
  }

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    return signal({ symbol: 'AAPL', price: 150, change: 2, volume: 5000, timestamp: '2024-01-01' });
  }
}
