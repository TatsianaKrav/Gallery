import { Component, input } from '@angular/core';
import { CharacterModel } from '../../models/character-model';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingComponent } from '../rating/rating.component';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, SkeletonModule, RatingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();
  readonly isLoading = input.required<boolean>();
  public ratesArray = Array.from({ length: 5 });
  currentRate = 0;

  constructor(
    public themeService: ThemeService) {
  }
}