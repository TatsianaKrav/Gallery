import { Component, DestroyRef } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../../components/error/error.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from '../../components/popup/popup.component';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { debounceTime, delay, Subject, tap } from 'rxjs';
import { CardService } from '../../services/card.service';
import { ErrorService } from '../../services/error.service';
import { PopupService } from '../../services/popup.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from '../../app.component';
import { appConfig } from '../../app.config';
import { RouterModule } from '@angular/router';

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
    PopupComponent,
    SkeletonModule,
    StyleClassModule,
    NgxSkeletonLoaderModule,
    RouterModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
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
