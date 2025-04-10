import { Component, input } from '@angular/core';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PopupComponent } from '../popup/popup.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  providers: [DialogService],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();
  ref: DynamicDialogRef | undefined;

  constructor(public themeService: ThemeService, private cardService: CardService, public popupService: PopupService,
    private dialogService: DialogService) {
  }

  show(event: Event): void {
    this.ref = this.dialogService.open(PopupComponent, {
      focusOnShow: false,
      width: '40%',
      height: '80%',
      closable: true,
      closeOnEscape: true,
      modal: true,
      contentStyle: { overflow: 'auto' },
      dismissableMask: true,
      baseZIndex: 10000
    });

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