import { TestBed } from '@angular/core/testing';
import { FinanceService } from './finance.service';
import { FINANCE_PROVIDER } from '../../providers/finance.provider';
import {MockFinanceProvider} from '../../../../mocks/FinanceProvider.mocks';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FinanceService, // Registrar el servicio bajo prueba
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider } // Registrar el mock para el token
      ]
    });
    service = TestBed.inject(FinanceService); // Inyectar el servicio
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch historical data', () => {
    const symbol = 'AAPL';
    const startDate = '2024-01-01';
    const endDate = '2024-01-31';

    const data = service.getHistoricalData(symbol, startDate, endDate);

    expect(data()).toEqual([{ date: '2024-01-01', open: 100, high: 105, low: 95, close: 100, volume: 1000 }]);
  });

  it('should fetch real time data', () => {
    const symbol = 'AAPL';

    const data = service.getRealTimeData(symbol);

    expect(data()).toEqual({ symbol: 'AAPL', price: 150, change: 2, volume: 5000, timestamp: '2024-01-01' });
  });
});
