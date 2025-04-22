import { Component, DestroyRef, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterModel } from '../../../models/character-model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ACTIONS } from '../../../utils/actions';
import { CommonPaginationResponse } from '../../../models/common-pagination-response';
import { CardService } from '../../../services/card.service';
import { InputValidationComponent } from './input-validation/input-validation.component';
import { RatingComponent } from './rating/rating.component';
import { CharacterFormModel } from '../../../models/character-form-model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { genderValidator, ratingValidator, statusValidator } from '../../../utils/validators';

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputValidationComponent,
    RatingComponent,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss'
})
export class CharacterFormComponent implements OnInit {

  readonly currCharacter = input.required<CharacterModel>();
  currentCharacter: Partial<CharacterModel | null | undefined> = null;
  allCardsResponse: CommonPaginationResponse<CharacterModel> | null = null;
  isEditale = false;
  form: FormGroup<CharacterFormModel> = new FormGroup({
    status: new FormControl(
      { value: '', disabled: true },
      { validators: [Validators.required, statusValidator()] }
    ),
    species: new FormControl(
      { value: '', disabled: true },
      { validators: [Validators.required] }),
    gender: new FormControl(
      { value: '', disabled: true }, {
      validators: [Validators.required, genderValidator()]
    }
    ),
    origin: new FormControl(
      { value: '', disabled: true },
      { validators: [Validators.required, Validators.minLength(4)] }),
    location: new FormControl(
      { value: '', disabled: true },
      { validators: [Validators.required, Validators.minLength(4)] }
    ),

    rating: new FormControl({ value: '0', disabled: true }, { validators: ratingValidator() })
  });

  constructor(
    private destroyRef: DestroyRef,
    private cardService: CardService,
    private messageService: MessageService
  ) {

    this.cardService.allCards$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(cards => {
        if (cards) {
          this.allCardsResponse = cards;
        }
      })
  }

  ngOnInit(): void {
    this.currentCharacter = this.currCharacter();

    if (this.currentCharacter.status) {
      this.form.controls.status.setValue(this.currentCharacter.status);
    }

    if (this.currentCharacter.species) {
      this.form.controls.species.setValue(this.currentCharacter.species);
    }

    if (this.currentCharacter.gender) {
      this.form.controls.gender.setValue(this.currentCharacter.gender);
    }

    if (this.currentCharacter.origin?.name) {
      this.form.controls.origin.setValue(this.currentCharacter.origin.name);
    }

    if (this.currentCharacter.location?.name) {
      this.form.controls.location.setValue(this.currentCharacter.location.name);
    }

    this.currentCharacter.rating
      ? this.form.controls.rating.setValue(`${this.currentCharacter.rating}`)
      : '0';
  }


  public handleAction(event: Event): void {
    const targetElement = event.target;

    if (targetElement instanceof HTMLElement) {
      const actionName = targetElement.className.split(' ')[0];

      if (actionName === ACTIONS.edit) {
        this.editData();
      } else if (actionName === ACTIONS.save) {

        if (this.form.invalid) return;
        this.saveData();
        this.showInfo();
      }
    }
  }

  private editData(): void {
    this.handleStates(true);

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(value => {

        if (this.currentCharacter) {
          if (value.status) {
            this.currentCharacter.status = value.status;
          }

          if (value.species) {
            this.currentCharacter.species = value.species;
          }

          if (value.gender) {
            this.currentCharacter.gender = value.gender;
          }

          if (value.location) {
            this.currentCharacter.location!.name = value.location;
          }

          if (value.origin) {
            this.currentCharacter.origin!.name = value.origin;
          }

          if (value.rating) {
            this.currentCharacter.rating = +value.rating;
          }
        }
      }
      );
  }

  saveData(): void {
    this.handleStates(false);

    if (this.allCardsResponse?.results.length) {
      const currentCard = this.allCardsResponse?.results.find(card => {
        if (this.currentCharacter) {
          return card.id === this.currentCharacter.id;
        }

        return null;
      })

      if (currentCard && this.currentCharacter) {
        const index = this.allCardsResponse?.results.indexOf(currentCard);
        this.allCardsResponse.results[index] = this.currentCharacter;

        this.cardService.allCards$.next({
          info: {
            ...this.allCardsResponse.info
          },
          results: this.allCardsResponse.results
        });
      }
    }
  }

  handleInputsState(value: boolean): void {
    Object.keys(this.form.controls).forEach(ctrl => {

      value ?
        this.form.controls[ctrl as keyof CharacterFormModel].enable()
        : this.form.controls[ctrl as keyof CharacterFormModel].disable();
    });
  }

  private handleStates(state: boolean): void {
    this.handleInputsState(state);
    this.isEditale = state;
  }

  showInfo(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Data successfully saved'
    })
  }
}
