import {HistoricalData} from '../app/shared/models/Interface/historical-data';
import {RealTimeData} from '../app/shared/models/Interface/real-time-data';
import {ExSymbol} from '../app/shared/models/Interface/symbol';

export class MockFinanceData {
  static readonly PRICE_RANGES = {
    OPEN: {min: 100, max: 200},
    HIGH: {min: 200, max: 300},
    LOW: {min: 50, max: 100},
    CLOSE: {min: 100, max: 200},
    VOLUME: {min: 1000, max: 10000},
  };

  static createMockHistoricalData(symbol: string, startDate: string, endDate: string, count: number): HistoricalData[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data: HistoricalData[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      data.push({
        date: date.getTime(),
        open: this.getRandomIntInRange(this.PRICE_RANGES.OPEN.min, this.PRICE_RANGES.OPEN.max),
        high: this.getRandomIntInRange(this.PRICE_RANGES.HIGH.min, this.PRICE_RANGES.HIGH.max),
        low: this.getRandomIntInRange(this.PRICE_RANGES.LOW.min, this.PRICE_RANGES.LOW.max),
        close: this.getRandomIntInRange(this.PRICE_RANGES.CLOSE.min, this.PRICE_RANGES.CLOSE.max),
        volume: this.getRandomIntInRange(this.PRICE_RANGES.VOLUME.min, this.PRICE_RANGES.VOLUME.max),
      });
    }

    return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  static createMockRealTimeData(symbol: string): RealTimeData {
    return {
      symbol,
      price: this.getRandomIntInRange(this.PRICE_RANGES.OPEN.min, this.PRICE_RANGES.HIGH.max),
      change: this.getRandomIntInRange(-10, 10),
      volume: this.getRandomIntInRange(this.PRICE_RANGES.VOLUME.min, this.PRICE_RANGES.VOLUME.max),
      timestamp: new Date().toISOString(),
    };
  }

  static createMockSymbols(): ExSymbol[] {
    return [
      {symbol: 'AAPL', displaySymbol: 'Apple Inc.', description: 'Apple Inc.'},
      {symbol: 'GOOGL', displaySymbol: 'Alphabet Inc.', description: 'Alphabet Inc.'},
      {symbol: 'MSFT', displaySymbol: 'Microsoft Corporation', description: 'Microsoft Corporation'},
      {symbol: 'AMZN', displaySymbol: 'Amazon.com Inc.', description: 'Amazon.com Inc.'},
      {symbol: 'FB', displaySymbol: 'Facebook Inc.', description: 'Facebook Inc.'},
      {symbol: 'TSLA', displaySymbol: 'Tesla Inc.', description: 'Tesla Inc.'},
      {symbol: 'NVDA', displaySymbol: 'Nvidia Corporation', description: 'Nvidia Corporation'},
      {symbol: 'PYPL', displaySymbol: 'PayPal Holdings Inc.', description: 'PayPal Holdings Inc.'},
      {symbol: 'ADBE', displaySymbol: 'Adobe Inc.', description: 'Adobe Inc.'},
      {symbol: 'INTC', displaySymbol: 'Intel Corporation', description: 'Intel Corporation'},
    ];
  }

  static createDataBySymbol(symbol: string): HistoricalData {
    return {
      date: new Date().getTime(),
      open: this.getRandomIntInRange(this.PRICE_RANGES.OPEN.min, this.PRICE_RANGES.OPEN.max),
      high: this.getRandomIntInRange(this.PRICE_RANGES.HIGH.min, this.PRICE_RANGES.HIGH.max),
      low: this.getRandomIntInRange(this.PRICE_RANGES.LOW.min, this.PRICE_RANGES.LOW.max),
      close: this.getRandomIntInRange(this.PRICE_RANGES.CLOSE.min, this.PRICE_RANGES.CLOSE.max),
      volume: this.getRandomIntInRange(this.PRICE_RANGES.VOLUME.min, this.PRICE_RANGES.VOLUME.max),
    };
  }

  private static getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
