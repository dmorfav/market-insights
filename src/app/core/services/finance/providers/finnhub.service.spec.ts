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

  it('should fetch symbol list', () => {

    const mockResponse = [
      {
        description: 'Apple Inc.',
        displaySymbol: 'AAPL',
        symbol: 'AAPL',
        type: 'Common Stock',
      },
      {
        description: 'Microsoft Corporation',
        displaySymbol: 'MSFT',
        symbol: 'MSFT',
        type: 'Common Stock',
      }
    ];
    const data = service.getSymbolList();

    const req = httpMock.expectOne(
      `${environment.FINNHUB_API_URL}/stock/symbol?token=${environment.FINNHUB_API_KEY}&exchange=US`
    );
    req.flush(mockResponse);

    expect(req.request.method).toBe('GET');
    expect(data().length).toEqual(2);
    expect(data()[0]).toEqual({
      description: 'Apple Inc.',
      displaySymbol: 'AAPL',
      symbol: 'AAPL',
    });
    expect(data()[1]).toEqual({
      description: 'Microsoft Corporation',
      displaySymbol: 'MSFT',
      symbol: 'MSFT',
    });
  });
});
