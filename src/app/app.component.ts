import { Component, OnInit } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ICard } from './utils/interfaces';
import { CommonModule, NgFor } from '@angular/common';
import { CardService } from './services/card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cards$: Observable<ICard[]>;

  constructor(private cardService: CardService) {
    this.cards$ = this.cardService.getAllCards();
  }
}
