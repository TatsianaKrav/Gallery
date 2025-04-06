import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CharacterModel } from '../models/character-model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popup$ = new BehaviorSubject(false);
  /*   character$: CharacterModel | null = null; */
  character$ = new Subject<CharacterModel>();
  private readonly body = document.body;


  constructor() {
  }

  handle(target: HTMLElement, character?: CharacterModel) {
    const currentValue = this.popup$.getValue();
    const className = target.className === 'popup-wrapper open' || target.className === 'close' ? target.className : null;

    if (!className && currentValue) return;

    this.popup$.next(!currentValue);
    this.body.classList.toggle('blocked');

    if (character) {
      this.character$.next({ ...character });
    }
  }
}
