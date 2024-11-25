import { TestBed } from '@angular/core/testing';
import { MockFinanceServiceService } from './mock-finance-service.service';
import { HistoricalData } from '../../../shared/models/Interface/historical-data';
import { RealTimeData } from '../../../shared/models/Interface/real-time-data';

describe('MockFinanceServiceService', () => {
  let service: MockFinanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockFinanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getHistoricalData', () => {
    it('should return an array of HistoricalData with valid entries', () => {
      const symbol = 'AAPL';
      const startDate = '2024-01-01';
      const endDate = '2024-12-31';

      const result = service.getHistoricalData(symbol, startDate, endDate);

      expect(result()).toBeTruthy();
      expect(Array.isArray(result())).toBeTrue();
      expect(result().length).toBeGreaterThan(0);

      result().forEach((data: HistoricalData) => {
        expect(data.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(data.open).toBeGreaterThan(0);
        expect(data.high).toBeGreaterThanOrEqual(data.open);
        expect(data.low).toBeLessThanOrEqual(data.open);
        expect(data.close).toBeGreaterThanOrEqual(data.low);
        expect(data.volume).toBeGreaterThan(0);
      });
    });

    it('should return sorted data by date', () => {
      const result = service.getHistoricalData('AAPL', '2024-01-01', '2024-12-31');

      for (let i = 1; i < result().length; i++) {
        const current = new Date(result()[i].date).getTime();
        const previous = new Date(result()[i - 1].date).getTime();
        expect(current).toBeGreaterThanOrEqual(previous);
      }
    });
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
  });
});
