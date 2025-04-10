import { Component, DestroyRef } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterModel } from '../../models/character-model';
import { CardService } from '../../services/card.service';
import { CommonPaginationResponse } from '../../models/common-pagination-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputTextModule } from 'primeng/inputtext';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  currentCharacter: CharacterModel | null = null;
  updatedCharacter: Partial<CharacterModel> | null = null;
  allCardsResponse: CommonPaginationResponse<CharacterModel> | null = null;
  form: FormGroup | null = null;
  isEditable = false;

  constructor(public popupService: PopupService, public themeService: ThemeService,
    private cardService: CardService, private destroyRef: DestroyRef) {
    this.popupService.character$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
        this.currentCharacter = value;

        this.form = new FormGroup({
          status: new FormControl({ value: this.currentCharacter?.status, disabled: !this.isEditable }, { updateOn: 'blur' }),
          species: new FormControl({ value: this.currentCharacter?.species, disabled: !this.isEditable }, { updateOn: 'blur' }),
          gender: new FormControl({ value: this.currentCharacter?.gender, disabled: !this.isEditable }, { updateOn: 'blur' }),
          origin: new FormControl({ value: this.currentCharacter?.origin.name, disabled: !this.isEditable }, { updateOn: 'blur' }),
          location: new FormControl({ value: this.currentCharacter?.location.name, disabled: !this.isEditable }, { updateOn: 'blur' }),
        });
      });

    this.cardService.allCards$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cards => {
        if (cards) {
          this.allCardsResponse = cards;
        }
      })


    this.popupService.popup$.subscribe(state => {
      if (!state) {
        this.isEditable = false;
      }
    })
  }

  updateData(): void {
    this.isEditable = true;
    this.handleInputsState(true);

    this.form?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => {
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
    this.handleInputsState(false);

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

  handleInputsState(value: boolean): void {
    if (this.form) {
      Object.keys(this.form.controls).forEach(ctrl => {
        if (this.form) {
          value ? this.form.controls[ctrl].enable() : this.form.controls[ctrl].disable();
        }
      });
    }
  }
}