import {Component, inject, OnInit} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FinanceService} from '../../../../core/services/finance/finance.service';

@Component({
  selector: 'app-main-dashboard',
  imports: [MatGridList, MatGridTile, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './main-dashboard.component.html',
  standalone: true,
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent implements OnInit {

  private readonly financeService = inject(FinanceService);

  ngOnInit(): void {
    const data = this.financeService.getHistoricalData('AAPL', '2021-01-01', '2021-12-31');
    console.log(data());
  }
}
