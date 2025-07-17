import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';

import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { FINANCE_PROVIDER } from './core/providers/finance.provider';
import { FinnhubService } from './core/services/finance/providers/finnhub.service';
import { MockFinanceService } from './core/services/finance/providers/mock-finance.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(NgxEchartsModule.forRoot({ echarts: () => import('echarts') })),
    {
      provide: FINANCE_PROVIDER,
      useClass: environment.production ? FinnhubService : MockFinanceService
    }
  ]
};
