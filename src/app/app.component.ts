import { Component } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { CardService } from './services/card.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { ErrorService } from './services/error.service';
import { debounceTime, delay, tap } from 'rxjs';
import { PopupComponent } from './components/popup/popup.component';
import { PopupService } from './services/popup.service';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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

  constructor(private cardService: CardService, private errorService: ErrorService,
    public popupService: PopupService
  ) {

    this.cards$.pipe(
      delay(500),
    )
    .subscribe(() => this.isLoading = false)

    this.nameControl.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe((value) => {

        if (value) {
          this.cards$ = cardService.getCharacter(value?.toLowerCase());
          this.errorService.clear();
        }
      });
  }
}
