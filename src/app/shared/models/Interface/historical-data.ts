export interface HistoricalData {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  change?: number;
  percentChange?: number;
  previousClose?: number;
  volume?: number;
}
