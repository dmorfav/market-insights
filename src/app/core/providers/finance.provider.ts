import { InjectionToken } from '@angular/core';
import {FinanceProviderInterface} from '../../shared/models/Interface/finance-provider-interface';
import {APP_CONSTANTS} from '../../shared/models/config/constants';

export const FINANCE_PROVIDER = new InjectionToken<FinanceProviderInterface>(APP_CONSTANTS.FINANCE_PROVIDER);
