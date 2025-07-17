import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'marketInsights';
  ngOnInit() {
    // Disable right click
    document.addEventListener('contextmenu', e => e.preventDefault());
  }
}
