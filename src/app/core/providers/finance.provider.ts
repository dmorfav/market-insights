import { InjectionToken } from '@angular/core';

import { APP_CONSTANTS } from '../../shared/models/config/constants';
import { FinanceProviderInterface } from '../../shared/models/Interface/finance-provider-interface';

export const FINANCE_PROVIDER = new InjectionToken<FinanceProviderInterface>(
  APP_CONSTANTS.FINANCE_PROVIDER
);
