import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FINANCE_PROVIDER} from './core/providers/finance.provider';
import {MockFinanceServiceService} from './core/services/financeProviders/mock-finance-service.service';
import {environment} from '../environments/environment';
import {FinnhubServiceService} from './core/services/financeProviders/finnhub-service.service';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: FINANCE_PROVIDER,
      useClass: !environment.production ? FinnhubServiceService : MockFinanceServiceService
    }
  ]
};
