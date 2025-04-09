import { Component, DestroyRef, inject } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { CardService } from './services/card.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';
import { debounceTime, delay, Subject, tap } from 'rxjs';
import { PopupComponent } from './components/popup/popup.component';
import { PopupService } from './services/popup.service';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CardComponent,
    CommonModule,
    ErrorComponent,
    FormsModule,
    ReactiveFormsModule,
    PopupComponent,
    SkeletonModule,
    StyleClassModule,
    NgxSkeletonLoaderModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly nameControl = new FormControl('');
  cards$ = this.cardService.getAllCards();
  isLoading = true;
  notifier = new Subject();

  constructor(private cardService: CardService, private errorService: ErrorService,
    public popupService: PopupService, private destroyRef: DestroyRef
  ) {

    this.cards$.pipe(
      delay(500),
      takeUntilDestroyed(this.destroyRef)
    )
      .subscribe(() => this.isLoading = false)

    this.nameControl.valueChanges
      .pipe(
        tap(() => this.isLoading = true),
        debounceTime(500),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {

        if (value) {
          this.cards$ = cardService.getCharacter(value?.toLowerCase());
          this.errorService.clear();

        }
        this.isLoading = false;
      });
  }
}


