import {Component, signal} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {SymbolListComponent} from '../../../../shared/components/symbol-list/symbol-list.component';
import { CandleChartComponent } from '../../../../shared/components/charts/candle-chart/candle-chart.component';
import { PortfolioAreaChartComponent } from '../../../../shared/components/charts/portfolio-area-chart/portfolio-area-chart.component';
import { AssetAllocationChartComponent } from '../../../../shared/components/charts/asset-allocation-chart/asset-allocation-chart.component';
import { MockChartDataService } from '../../../../core/services/chart/mock-chart-data.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    SymbolListComponent,
    CandleChartComponent,
    PortfolioAreaChartComponent,
    AssetAllocationChartComponent
  ]
})
export class MainDashboardComponent {
  private readonly dataService = inject(MockChartDataService);

  candles = signal(this.dataService.generateCandles(200));
  areaPoints = signal(this.dataService.generateAreaPoints(100));
  allocation = signal(this.dataService.generateAllocation());
}
