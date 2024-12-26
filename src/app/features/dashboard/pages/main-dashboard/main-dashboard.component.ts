import {Component} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {SymbolListComponent} from '../../../../shared/components/symbol-list/symbol-list.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    SymbolListComponent
  ]
})
export class MainDashboardComponent {
}
