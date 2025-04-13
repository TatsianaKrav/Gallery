import { AfterContentChecked, Component, DestroyRef, input, Output } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterModel } from '../../../models/character-model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormService } from '../../../services/form-service';
import { ACTIONS } from '../../../utils/actions';
import { CommonPaginationResponse } from '../../../models/common-pagination-response';
import { CardService } from '../../../services/card.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements AfterContentChecked {

  readonly currCharacter = input.required<CharacterModel>();
  updatedCharacter: Partial<CharacterModel> | null = null;
  currentCharacter: CharacterModel | null = null;
  allCardsResponse: CommonPaginationResponse<CharacterModel> | null = null;
  form: FormGroup | null = null;
  isEditable = false;

  constructor(
    public popupService: PopupService,
    private destroyRef: DestroyRef,
    private formService: FormService,
    private cardService: CardService,
  ) {

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

    this.formService.action$.subscribe(value => {
      if (value && value === ACTIONS.edit) {
        this.updateData();
      } else if (value && value === ACTIONS.save) {
        this.saveData();
      }
    });
  }

  ngAfterContentChecked(): void {
    this.currentCharacter = this.currCharacter();

    if (this.currentCharacter && !this.form) {
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      status: new FormControl(
        { value: this.currentCharacter?.status, disabled: !this.isEditable },
        { updateOn: 'blur' }
      ),
      species: new FormControl(
        { value: this.currentCharacter?.species, disabled: !this.isEditable },
        { updateOn: 'blur' }
      ),
      gender: new FormControl(
        { value: this.currentCharacter?.gender, disabled: !this.isEditable },
        { updateOn: 'blur' }
      ),
      origin: new FormControl(
        { value: this.currentCharacter?.origin.name, disabled: !this.isEditable },
        { updateOn: 'blur' }
      ),
      location: new FormControl
        ({ value: this.currentCharacter?.location.name, disabled: !this.isEditable },
          { updateOn: 'blur' }
        ),
    });
  }

  updateData(): void {
    this.handleStates(true);

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
    this.handleStates(false);

    if (this.updatedCharacter) {
      this.form?.patchValue(this.updatedCharacter);

      if (this.allCardsResponse?.results.length) {
        const currentCard = this.allCardsResponse?.results.find(card => {
          if (this.currentCharacter) {
            return card.id === this.currentCharacter.id;
          }

          return null;
        })

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

  handleStates(state: boolean): void {
    this.isEditable = state;
    this.handleInputsState(state);
    this.formService.isEditable$.next(state);
  }

}
