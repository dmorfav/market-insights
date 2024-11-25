import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FinanceProviderInterface } from '../../../shared/models/Interface/finance-provider-interface';
import { HistoricalData } from '../../../shared/models/Interface/historical-data';
import { RealTimeData } from '../../../shared/models/Interface/real-time-data';

@Injectable({
  providedIn: 'root',
})
export class FinnhubServiceService implements FinanceProviderInterface {
  private readonly apiUrl = 'https://finnhub.io/api/v1';
  private readonly http = inject(HttpClient);

  getHistoricalData(symbol: string, startDate: string, endDate: string): WritableSignal<HistoricalData[]> {
    const historicalDataSignal = signal<HistoricalData[]>([]);

    const params = {
      symbol,
      from: startDate,
      to: endDate,
      token: environment.finnhubApiKey,
    };

    this.http.get<{ c: number[]; h: number[]; l: number[]; o: number[]; t: number[] }>(
      `${this.apiUrl}/stock/candle`,
      { params }
    ).subscribe((response) => {
      if (response?.t) {
        const data = response.t.map((timestamp, index) => ({
          date: new Date(timestamp * 1000).toISOString(),
          open: response.o[index],
          high: response.h[index],
          low: response.l[index],
          close: response.c[index],
          volume: 0,
        }));
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
      token: environment.finnhubApiKey,
    };

    this.http.get<{ c: number; d: number; dp: number; t: number; v: number }>(
      `${this.apiUrl}/quote`,
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
}
