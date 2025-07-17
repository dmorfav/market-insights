import { Component, signal } from '@angular/core';
import { inject } from '@angular/core';

import {
  StackedAreaSeries,
  BumpSeries,
  BoxplotPoint,
  DonutSlice
} from '../../../../core/services/chart/chart-facade.service';
import { TreemapNode, SunburstNode } from '../../../../core/services/chart/chart-facade.service';
import { MockChartDataService } from '../../../../core/services/chart/mock-chart-data.service';
import { AssetAllocationChartComponent } from '../../../../shared/components/charts/asset-allocation-chart/asset-allocation-chart.component';
import { BoxplotChartComponent } from '../../../../shared/components/charts/boxplot-chart/boxplot-chart.component';
import { BumpChartComponent } from '../../../../shared/components/charts/bump-chart/bump-chart.component';
import { CandleChartComponent } from '../../../../shared/components/charts/candle-chart/candle-chart.component';
import { DonutChartComponent } from '../../../../shared/components/charts/donut-chart/donut-chart.component';
import { LineChartComponent } from '../../../../shared/components/charts/line-chart/line-chart.component';
import { PortfolioAreaChartComponent } from '../../../../shared/components/charts/portfolio-area-chart/portfolio-area-chart.component';
import { StackedAreaChartComponent } from '../../../../shared/components/charts/stacked-area-chart/stacked-area-chart.component';
import { SunburstChartComponent } from '../../../../shared/components/charts/sunburst-chart/sunburst-chart.component';
import { TreemapChartComponent } from '../../../../shared/components/charts/treemap-chart/treemap-chart.component';
import { ViolinChartComponent } from '../../../../shared/components/charts/violin-chart/violin-chart.component';
import { SymbolListComponent } from '../../../../shared/components/symbol-list/symbol-list.component';
import { CandleWidgetComponent } from '../../../../shared/widgets/candle-widget/candle-widget.component';
import { PriceCardWidgetComponent } from '../../../../shared/widgets/price-card-widget/price-card-widget.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: true,
  imports: [
    SymbolListComponent,
    CandleChartComponent,
    PortfolioAreaChartComponent,
    AssetAllocationChartComponent,
    LineChartComponent,
    StackedAreaChartComponent,
    BumpChartComponent,
    PriceCardWidgetComponent,
    CandleWidgetComponent,
    BoxplotChartComponent,
    ViolinChartComponent,
    DonutChartComponent,
    TreemapChartComponent,
    SunburstChartComponent
  ]
})
export class MainDashboardComponent {
  private readonly dataService = inject(MockChartDataService);

  candles = signal(this.dataService.generateCandles(200));
  areaPoints = signal(this.dataService.generateAreaPoints(100));
  allocation = signal(this.dataService.generateAllocation());

  linePoints = signal(this.dataService.generateAreaPoints(100));

  stackedSeries = signal<StackedAreaSeries[]>([
    { name: 'Serie A', points: this.dataService.generateAreaPoints(100) },
    { name: 'Serie B', points: this.dataService.generateAreaPoints(100) }
  ]);

  bumpSeries = signal<BumpSeries[]>([
    { name: 'Serie A', points: this.generateRankPoints(10) },
    { name: 'Serie B', points: this.generateRankPoints(10) }
  ]);

  boxplotData = signal<BoxplotPoint[]>(this.dataService.generateBoxplotData());

  violinData = signal(this.dataService.generateViolinData());

  donutSlices = signal<DonutSlice[]>(this.dataService.generateDonutSlices());

  treemapData = signal<TreemapNode[]>(this.dataService.generateTreeData());

  sunburstData = signal<SunburstNode[]>(this.dataService.generateTreeData());

  private generateRankPoints(count: number) {
    const now = Math.floor(Date.now() / 1000);
    return Array.from({ length: count }).map((_, idx) => ({
      time: now - (count - idx) * 60,
      rank: Math.floor(Math.random() * 5) + 1
    }));
  }
}
