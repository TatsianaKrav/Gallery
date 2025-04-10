import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  lightOn$ = new BehaviorSubject(true);

  constructor() {

  }

  toggleTheme(): void {
    const currentThemeState = this.lightOn$.getValue();
    this.lightOn$.next(!currentThemeState);
  }
}
