import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  body = document.body;

  constructor(public themeService: ThemeService) {

  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.body.classList.toggle('dark');
  }
}
