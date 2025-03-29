import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ICard } from './utils/interfaces';
import { CommonModule, NgFor } from '@angular/common';
import { CardService } from './services/card.service';
import { map, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor, CommonModule, FormsModule, ErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cards$: Observable<ICard[]>;
  name = '';

  constructor(private cardService: CardService, private errorService: ErrorService) {
    this.cards$ = this.cardService.getAllCards();
  }

  updateCards() {
    this.cards$ = this.cardService.getCharacter(this.name.toLowerCase());

    if (!this.name) {
      this.errorService.clear();
    }
  }
}
