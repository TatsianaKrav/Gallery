import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';
import { CommonPaginationResponse } from '../../models/common-pagination-response';


@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  currentCharacter: CharacterModel | null = null;
  updatedCharacter: Partial<CharacterModel> | null = null;
  allCardsResponse: CommonPaginationResponse<CharacterModel> | null = null;
  form: FormGroup | null = null;
  isEditable = false;

  constructor(public popupService: PopupService, private cardService: CardService) {
    this.popupService.character$.subscribe(value => {
      this.currentCharacter = value;

      this.form = new FormGroup({
        status: new FormControl(this.currentCharacter?.status, { updateOn: 'blur' }),
        species: new FormControl(this.currentCharacter?.species, { updateOn: 'blur' }),
        gender: new FormControl(this.currentCharacter?.gender, { updateOn: 'blur' }),
        origin: new FormControl(this.currentCharacter?.origin.name, { updateOn: 'blur' }),
        location: new FormControl(this.currentCharacter?.location.name, { updateOn: 'blur' }),
      });
    });

    this.cardService.allCards$.subscribe(cards => {
      if (cards) {
        this.allCardsResponse = cards;
      }
    })
  }

  close(event: Event): void {
    event.stopPropagation();
    const target = event.target;

    if (target && target instanceof HTMLElement) {
      this.popupService.handle(target);
    }
  }

  updateData(): void {
    this.isEditable = true;

    this.form?.valueChanges.subscribe(value => {
      this.updatedCharacter = { ...value };

      if (this.updatedCharacter && this.currentCharacter) {
        this.currentCharacter = {
          ...this.currentCharacter,
          ...this.updatedCharacter,
          location: { ...this.currentCharacter.location },
          origin: { ...this.currentCharacter.origin },
        };

        this.currentCharacter.location.name = value.location;
        this.currentCharacter.origin.name = value.origin;
      }
    });
  }

  saveData(): void {
    this.isEditable = false;

    if (this.updatedCharacter) {
      this.form?.patchValue(this.updatedCharacter);

      if (this.allCardsResponse?.results.length) {
        const currentCard = this.allCardsResponse?.results.find(card => card.id === this.currentCharacter?.id);

        if (currentCard && this.updatedCharacter && this.currentCharacter) {
          const index = this.allCardsResponse?.results.indexOf(currentCard);
          this.allCardsResponse?.results.splice(index, 1, this.currentCharacter);

          this.cardService.allCards$.next({
            info: {
              ...this.allCardsResponse.info
            },
            results: this.allCardsResponse.results
          });
        }
      }
    }
  }
}