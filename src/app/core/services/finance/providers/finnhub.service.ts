import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FinanceProviderInterface} from '../../../../shared/models/Interface/finance-provider-interface';
import {HistoricalData} from '../../../../shared/models/Interface/historical-data';
import {environment} from '../../../../../environments/environment';
import {RealTimeData} from '../../../../shared/models/Interface/real-time-data';
import {ExSymbol} from '../../../../shared/models/Interface/symbol';

@Injectable({
  providedIn: 'root',
})
export class FinnhubService implements FinanceProviderInterface {
  private readonly http = inject(HttpClient);

  getDataBySymbol(symbol: string): WritableSignal<HistoricalData> {
    const historicalDataSignal = signal<HistoricalData>({} as HistoricalData);

    const params = {
      symbol,
      token: environment.FINNHUB_API_KEY,
    };

    this.http.get<{ c: number; d: number; dp: number; h: number; l: number, o: number, pc: number, t:number }>(
      `${environment.FINNHUB_API_URL}/quote`,
      { params }
    ).subscribe((response) => {
      if (response) {
        const data = {
          date: response.t,
          open: response.o,
          close: response.c,
          change: response.d,
          high: response.h,
          low: response.l,
          percentChange: response.dp,
          previousClose: response.pc,
        };
        historicalDataSignal.set(data);
      }
    });

    return historicalDataSignal;
  }

  getRealTimeData(symbol: string): WritableSignal<RealTimeData> {
    const realTimeSignal = signal<RealTimeData>({
      symbol: '',
      price: 0,
      change: 0,
      volume: 0,
      timestamp: '',
    });

    const params = {
      symbol,
      token: environment.FINNHUB_API_KEY,
    };

    this.http.get<{ c: number; d: number; dp: number; t: number; v: number }>(
      `${environment.FINNHUB_API_URL}/quote`,
      { params }
    ).subscribe((response) => {
      if (response) {
        realTimeSignal.set({
          symbol,
          price: response.c,
          change: response.d,
          volume: response.v,
          timestamp: new Date(response.t * 1000).toISOString(),
        });
      }
    });

    return realTimeSignal;
  }

  getSymbolList(): WritableSignal<ExSymbol[]> {
    const symbolListSignal = signal<ExSymbol[]>([]);

    const params = {
      token: environment.FINNHUB_API_KEY,
      exchange: 'US',
    };

    this.http.get<{ description: string, displaySymbol: string, symbol: string }[]>(
      `${environment.FINNHUB_API_URL}/stock/symbol`,
      { params }
    ).subscribe((response) => {
      if (response) {
        const data = response.map((symbol) => ({
          description: symbol.description,
          displaySymbol: symbol.displaySymbol,
          symbol: symbol.symbol,
        }));
        symbolListSignal.set(data.sort((a, b) => a.displaySymbol.localeCompare(b.displaySymbol)));
      }
    });
    return symbolListSignal;
  }
}
