import { Component, input, OnInit } from '@angular/core';
import { CharacterModel } from '../../models/character-model';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  readonly card = input.required<CharacterModel>();
 
}