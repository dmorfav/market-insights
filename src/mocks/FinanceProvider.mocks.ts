// Mock del proveedor
import {FinanceProviderInterface} from '../app/shared/models/Interface/finance-provider-interface';
import {signal, WritableSignal} from '@angular/core';
import {ExSymbol} from '../app/shared/models/Interface/symbol';
import {HistoricalData} from '../app/shared/models/Interface/historical-data';

export class MockFinanceProvider implements FinanceProviderInterface {

  getRealTimeData(_symbol: string) {
    return signal({ symbol: _symbol, price: 150, change: 2, volume: 5000, timestamp: '2024-01-01' });
  }

  getSymbolList(): WritableSignal<ExSymbol[]> {
    return signal([
      { description: '', symbol: 'AAPL', displaySymbol: 'Apple Inc.' },
      { description: '', symbol: 'GOOGL', displaySymbol: 'Alphabet Inc.' }
    ]);
  }

  getDataBySymbol(symbol: string): WritableSignal<HistoricalData> {
    return signal({
      date: 3600,
      open: 150,
      close: 152,
      change: 2,
      high: 155,
      low: 148,
      percentChange: 1.33,
      previousClose: 150
    });
  }
}
