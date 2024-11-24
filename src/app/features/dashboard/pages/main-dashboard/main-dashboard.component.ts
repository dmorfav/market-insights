import { Component } from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MenuHeaderComponent} from '../../../../shared/components/menu-header/menu-header.component';
import {RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-main-dashboard',
  imports: [MatGridList, MatGridTile, MenuHeaderComponent, RouterOutlet, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  templateUrl: './main-dashboard.component.html',
  standalone: true,
  styleUrl: './main-dashboard.component.scss'
})
export class MainDashboardComponent {

}
