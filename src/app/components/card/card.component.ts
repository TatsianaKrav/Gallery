import { Component, input, OnInit } from '@angular/core';
import { ICard } from '../../utils/interfaces';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  readonly card = input<ICard>();
  public cardElement: ICard | undefined;

  ngOnInit(): void {
    this.cardElement = this.card();
  }
}