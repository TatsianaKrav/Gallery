import { AfterContentChecked, Component, DestroyRef, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CharacterModel } from '../../../models/character-model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormService } from '../../../services/form-service';
import { ACTIONS } from '../../../utils/actions';
import { CommonPaginationResponse } from '../../../models/common-pagination-response';
import { CardService } from '../../../services/card.service';
import { InputValidationComponent } from './input-validation/input-validation.component';
import { RatingComponent } from './rating/rating.component';
import { ModalActionsComponent } from "../modal-actions/modal-actions.component";

@Component({
  selector: 'app-character-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputValidationComponent,
    RatingComponent
  ],
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.scss'
})
export class CharacterFormComponent implements AfterContentChecked {

  readonly currCharacter = input.required<CharacterModel>();
  updatedCharacter: Partial<CharacterModel> | null = null;
  currentCharacter: CharacterModel | null = null;
  allCardsResponse: CommonPaginationResponse<CharacterModel> | null = null;
  form: FormGroup | null = null;


  constructor(
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

  createForm(): void {
    this.form = new FormGroup({
      status: new FormControl(
        this.currentCharacter?.status,
        {
          validators: [Validators.required, Validators.pattern('^[Aa]live|[Dd]ead')],
          updateOn: 'blur'
        }
      ),
      species: new FormControl(this.currentCharacter?.species, { validators: [Validators.required], updateOn: 'blur' }),
      gender: new FormControl(this.currentCharacter?.gender, {
        validators: [Validators.required, Validators.pattern('^[Mm]ale|[Ff]emale')],
        updateOn: 'blur'
      }
      ),
      origin: new FormControl(
        this.currentCharacter?.origin,
        {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur'
        }),
      location: new FormControl(
        this.currentCharacter?.location.name,
        {
          validators: [Validators.required, Validators.minLength(4)],
          updateOn: 'blur'
        }
      ),

      rating: new FormControl('0')
    });

    this.handleStates(false);
  }


  getControl(name: string): FormControl {
    if (!this.form) throw new Error('Form is not found');

    return this.form.get(name) as FormControl;
  }

  updateData(): void {
    this.handleStates(true);

    this.form?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),
      )
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

        if (this.form?.invalid) {
          this.formService.isEditable$.next(false);
        } else if (this.form?.valid) {
          this.formService.isEditable$.next(true);
        }
      }
      );
  }

  saveData(): void {
    this.handleStates(false);

    if (this.updatedCharacter) {
      this.form?.patchValue({ value: this.updatedCharacter, updateOn: 'blur' });

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
    this.handleInputsState(state);
    this.formService.isEditable$.next(state);
  }
}
