import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {FinnhubServiceService} from './finnhub-service.service';
import {environment} from '../../../../environments/environment';
import {provideHttpClient} from '@angular/common/http';

describe('FinnhubServiceService', () => {
  let service: FinnhubServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinnhubServiceService, provideHttpClient(),provideHttpClientTesting()],
    });
    service = TestBed.inject(FinnhubServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch historical data', (done) => {
    const mockResponse = {
      t: [1609459200, 1609545600],
      o: [100, 101],
      h: [105, 106],
      l: [95, 96],
      c: [100, 102],
    };

    const symbol = 'AAPL';
    const startDate = '2021-01-01';
    const endDate = '2021-01-02';

    const dataSignal = service.getHistoricalData(symbol, startDate, endDate);

    const req = httpMock.expectOne(
      `${service['apiUrl']}/stock/candle?symbol=${symbol}&from=${startDate}&to=${endDate}&token=${environment.finnhubApiKey}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    expect(dataSignal()).toEqual([
      {date: '2021-01-01T00:00:00.000Z', open: 100, high: 105, low: 95, close: 100, volume: 0},
      {date: '2021-01-02T00:00:00.000Z', open: 101, high: 106, low: 96, close: 102, volume: 0},
    ]);
    done();
  });

  it('should fetch real-time data', (done) => {
    const mockResponse = {
      c: 150,
      d: 2,
      dp: 1.5,
      t: 1609459200,
      v: 5000,
    };

    const symbol = 'AAPL';

    const realTimeSignal = service.getRealTimeData(symbol);

    const req = httpMock.expectOne(
      `${service['apiUrl']}/quote?symbol=${symbol}&token=${environment.finnhubApiKey}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    expect(realTimeSignal()).toEqual({
      symbol: 'AAPL',
      price: 150,
      change: 2,
      volume: 5000,
      timestamp: '2021-01-01T00:00:00.000Z',
    });
    done();
  });
});
