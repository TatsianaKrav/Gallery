import { Component, input, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();

  constructor(private cardService: CardService) {

  }

  handleCard(event: Event): void {
    const currentCard = event.currentTarget;
    let idCharacter: string | null;

    if (currentCard && currentCard instanceof HTMLElement) {
      idCharacter = currentCard.getAttribute('id');

      if (idCharacter) {
        this.cardService.getCharacterById(+idCharacter).subscribe(value => console.log(value))
        //show popup
      }
    }
  }
}