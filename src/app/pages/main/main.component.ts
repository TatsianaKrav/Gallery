import { Component, DestroyRef } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../components/error/error.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { debounceTime, delay, map, Subject, tap } from 'rxjs';
import { CardService } from '../../services/card.service';
import { ErrorService } from '../../services/error.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from '../../app.component';
import { appConfig } from '../../app.config';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ModalContainerComponent } from "../../components/modal-container/modal-container.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CharacterModel } from '../../models/character-model';

bootstrapApplication(AppComponent, appConfig);

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    ErrorComponent,
    FormsModule,
    ReactiveFormsModule,
    SkeletonModule,
    StyleClassModule,
    NgxSkeletonLoaderModule,
    RouterModule
  ],
  providers: [DialogService],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  protected readonly nameControl = new FormControl('');
  cards$ = this.cardService.getAllCards();
  isLoading = true;
  notifier = new Subject();
  ref: DynamicDialogRef | undefined;

  constructor(
    public themeService: ThemeService,
    private cardService: CardService,
    public errorService: ErrorService,
    private destroyRef: DestroyRef,
    private dialogService: DialogService,
  ) {

    this.cards$.pipe(
      delay(500),
      takeUntilDestroyed(this.destroyRef),
    )
      .subscribe(() => {
        this.isLoading = false;
      })

    this.nameControl.valueChanges
      .pipe(
        tap(() => this.isLoading = true),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {

        if (value) {
          this.cards$ = cardService.getCharacter(value?.toLowerCase());
        } else {
          this.cards$ = this.cardService.getAllCards();
        }
        this.errorService.clear();
        this.isLoading = false;
      });
  }

  showModal(event: Event): void {
    const currentCard = event.currentTarget;
    let idCharacter: string | null = '';

    if (currentCard instanceof HTMLElement) {
      const currentElement = currentCard.firstElementChild;

      if (!currentElement?.classList.contains('card')) return;
      if (currentElement) {
        idCharacter = currentElement.getAttribute('id');

        if (idCharacter) {
          this.cardService.getCharacterById(+idCharacter).subscribe(value => {

            this.renderModal(value);
          });
        }
      }
    }

    document.body.classList.add('blocked');
  }

  private renderModal(character: CharacterModel): void {
    this.ref = this.dialogService.open(ModalContainerComponent, {
      focusOnShow: false,
      width: '40%',
      height: '80%',
      closable: true,
      closeOnEscape: true,
      modal: true,
      contentStyle: { overflow: 'auto' },
      dismissableMask: true,
      baseZIndex: 10000,
      data: character
    });


    this.ref.onClose.subscribe(() => {
      document.body.classList.remove('blocked');
    });
  }
}
