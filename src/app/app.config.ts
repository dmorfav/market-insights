import {ApplicationConfig, provideExperimentalZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FINANCE_PROVIDER} from './core/providers/finance.provider';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';
import {FinnhubService} from './core/services/finance/providers/finnhub.service';
import {MockFinanceService} from './core/services/finance/providers/mock-finance.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: FINANCE_PROVIDER,
      useClass: environment.production ? FinnhubService : MockFinanceService
    }
  ]
};
