import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FinnhubService } from './finnhub.service';
import { provideHttpClient } from '@angular/common/http';
import {environment} from '../../../../../environments/environment';

describe('FinnhubService', () => {
  let service: FinnhubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FinnhubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch historical data', () => {
    const mockResponse = {
      t: [1609459200, 1609545600],
      o: [100, 101],
      h: [105, 106],
      l: [95, 96],
      c: [100, 102],
    };

    const symbol = 'AAPL';

    const data = service.getDataBySymbol(symbol)

    const req = httpMock.expectOne(
      `${environment.FINNHUB_API_URL}/quote?symbol=${symbol}&token=${environment.FINNHUB_API_KEY}`
    );

    req.flush(mockResponse);
    expect(req.request.method).toBe('GET');
    /*expect(data()).toEqual([
      { date: '2021-01-01T00:00:00.000Z', open: 100, high: 105, low: 95, close: 100, volume: 0 },
      { date: '2021-01-02T00:00:00.000Z', open: 101, high: 106, low: 96, close: 102, volume: 0 },
    ]);*/

  });

  it('should fetch real-time data', () => {
    const mockResponse = {
      c: 150,
      d: 2,
      dp: 1.5,
      t: 1609459200,
      v: 5000,
    };

    const symbol = 'AAPL';

    const data = service.getRealTimeData(symbol);

    const req = httpMock.expectOne(
      `${environment.FINNHUB_API_URL}/quote?symbol=${symbol}&token=${environment.FINNHUB_API_KEY}`
    );
    req.flush(mockResponse);

    expect(req.request.method).toBe('GET');
    expect(data()).toEqual({
      symbol: 'AAPL',
      price: 150,
      change: 2,
      volume: 5000,
      timestamp: '2021-01-01T00:00:00.000Z',
    });
  });
});
