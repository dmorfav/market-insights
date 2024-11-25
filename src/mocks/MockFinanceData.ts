import {HistoricalData} from '../app/shared/models/Interface/historical-data';
import {RealTimeData} from '../app/shared/models/Interface/real-time-data';

export class MockFinanceData {
  static readonly PRICE_RANGES = {
    OPEN: { min: 100, max: 200 },
    HIGH: { min: 200, max: 300 },
    LOW: { min: 50, max: 100 },
    CLOSE: { min: 100, max: 200 },
    VOLUME: { min: 1000, max: 10000 },
  };

  static createMockHistoricalData(symbol: string, startDate: string, endDate: string, count: number): HistoricalData[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const data: HistoricalData[] = [];

    for (let i = 0; i < count; i++) {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      data.push({
        date: date.toISOString().split('T')[0],
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

  private static getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
