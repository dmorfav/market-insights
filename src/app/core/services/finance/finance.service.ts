import {inject, Injectable} from '@angular/core';
import {FINANCE_PROVIDER} from '../../providers/finance.provider';
import {FinanceProviderInterface} from '../../../shared/models/Interface/finance-provider-interface';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private readonly financeService = inject<FinanceProviderInterface>(FINANCE_PROVIDER);

  getHistoricalData(symbol: string, startDate: string, endDate: string) {
    return this.financeService.getHistoricalData(symbol, startDate, endDate);
  }
}
