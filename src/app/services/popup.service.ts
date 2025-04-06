import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CharacterModel } from '../models/character-model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popup$ = new BehaviorSubject(false);
  character$: CharacterModel | null = null;
  private readonly body = document.body;


  constructor() {
  }

  handle(character?: CharacterModel) {
    const currentValue = this.popup$.getValue();
    this.popup$.next(!currentValue);
    this.body.classList.toggle('blocked');

    if (character) {
      this.character$ = { ...character };
    }
  }
}
