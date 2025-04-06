import { Component, input, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();

  constructor(private cardService: CardService, public popupService: PopupService) {

  }

  handleCard(event: Event): void {
    const currentCard = event.currentTarget;
    const target = event.target;

    let idCharacter: string | null;

    if (currentCard && currentCard instanceof HTMLElement) {
      idCharacter = currentCard.getAttribute('id');

      if (idCharacter) {
        this.cardService.getCharacterById(+idCharacter).subscribe(value => {
          this.popupService.handle(value);
        });
      }
    }
  }
}