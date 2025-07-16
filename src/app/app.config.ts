import {ApplicationConfig, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FINANCE_PROVIDER} from './core/providers/finance.provider';
import {environment} from '../environments/environment';
import {provideHttpClient} from '@angular/common/http';
import {FinnhubService} from './core/services/finance/providers/finnhub.service';
import {MockFinanceService} from './core/services/finance/providers/mock-finance.service';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
    {
      provide: FINANCE_PROVIDER,
      useClass: environment.production ? FinnhubService : MockFinanceService
    }
  ]
};
