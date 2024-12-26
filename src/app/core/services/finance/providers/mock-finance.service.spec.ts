import { TestBed } from '@angular/core/testing';
import { MockFinanceService } from './mock-finance.service';

describe('MockFinanceService', () => {
  let service: MockFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRealTimeData', () => {
    it('should return a valid RealTimeData object', () => {
      const symbol = 'AAPL';

      const result = service.getRealTimeData(symbol);

      expect(result()).toBeTruthy();
      expect(result().symbol).toBe(symbol);
      expect(result().price).toBeGreaterThan(0);
      expect(result().timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
      expect(result().volume).toBeGreaterThan(0);
      expect(result().change).toBeDefined();
    });

    it('should return a different object for each symbol', () => {
      const symbol1 = 'AAPL';
      const symbol2 = 'GOOGL';

      const result1 = service.getRealTimeData(symbol1);
      const result2 = service.getRealTimeData(symbol2);

      expect(result1()).not.toEqual(result2());
    });

    it('should return a symbol list', () => {
      const symbolList = service.getSymbolList();
      expect(symbolList().length).toBeGreaterThan(0);
    });

    it('should return historical data from symbol ', () => {
      const data = service.getDataBySymbol('AAPL');
      expect(data()).toBeTruthy();

      expect(data().date).toBeGreaterThan(0);
      expect(data().low).toBeGreaterThanOrEqual(50);
      expect(data().low).toBeLessThanOrEqual(100);
      expect(data().high).toBeGreaterThanOrEqual(200);
      expect(data().high).toBeLessThanOrEqual(300);
      expect(data().open).toBeGreaterThanOrEqual(100);
      expect(data().open).toBeLessThanOrEqual(200);
      expect(data().close).toBeGreaterThanOrEqual(100);
      expect(data().close).toBeLessThanOrEqual(200);
      expect(data().volume).toBeGreaterThanOrEqual(1000);
      expect(data().volume).toBeLessThanOrEqual(10000);


    });
  });
});
