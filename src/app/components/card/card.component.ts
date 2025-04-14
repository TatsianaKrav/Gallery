import { Component, input } from '@angular/core';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();
  readonly isLoading = input.required<boolean>();

  constructor(
    public themeService: ThemeService,
    private cardService: CardService,
    public popupService: PopupService) {
  }

  handleCard(event: Event): void {
    const currentCard = event.currentTarget;
    const target = event.target;
    let idCharacter: string | null;

    if (currentCard && currentCard instanceof HTMLElement && target instanceof HTMLElement) {
      idCharacter = currentCard.getAttribute('id');

      if (idCharacter) {
        this.cardService.getCharacterById(+idCharacter).subscribe(value => {
          this.popupService.handle(value);
        });
      }
    }
  }
}