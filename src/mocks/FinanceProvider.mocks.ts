// Mock del proveedor
import {FinanceProviderInterface} from '../app/shared/models/Interface/finance-provider-interface';
import {signal} from '@angular/core';

export class MockFinanceProvider implements FinanceProviderInterface {
  getHistoricalData(symbol: string, startDate: string, endDate: string) {
    return signal([{ date: '2024-01-01', open: 100, high: 105, low: 95, close: 100, volume: 1000 }]);
  }
  getRealTimeData(symbol: string) {
    return signal({ symbol: 'AAPL', price: 150, change: 2, volume: 5000, timestamp: '2024-01-01' });
  }
}
