import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MockFinanceProvider } from '../../../../mocks/FinanceProvider.mocks';
import { FINANCE_PROVIDER } from '../../providers/finance.provider';

import { FinanceService } from './finance.service';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        FinanceService, // Registrar el servicio bajo prueba
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider } // Registrar el mock para el token
      ]
    });
    service = TestBed.inject(FinanceService); // Inyectar el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch real time data', () => {
    const symbol = 'AAPL';

    const data = service.getRealTimeData(symbol);

    expect(data()).toEqual({
      symbol: 'AAPL',
      price: 150,
      change: 2,
      volume: 5000,
      timestamp: '2024-01-01'
    });
  });

  it('should return historical data for a valid symbol', () => {
    const symbol = 'AAPL';
    const data = service.getDataBySymbol(symbol);
    expect(data()).toEqual({
      date: 3600,
      open: 150,
      close: 152,
      change: 2,
      high: 155,
      low: 148,
      percentChange: 1.33,
      previousClose: 150
    });
  });

  it('should return a symbol list', () => {
    const symbols = service.getSymbolList();
    expect(symbols()).toEqual([
      { description: '', symbol: 'AAPL', displaySymbol: 'Apple Inc.' },
      { description: '', symbol: 'GOOGL', displaySymbol: 'Alphabet Inc.' }
    ]);
  });
});
