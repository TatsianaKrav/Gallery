import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CharacterModel } from '../models/character-model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popup$ = new BehaviorSubject(false);
  character$ = new Subject<CharacterModel>();
  private readonly body = document.body;


  constructor() {
  }

  handle(character?: CharacterModel) {
    this.body.classList.toggle('blocked');

    if (character) {
      this.character$.next({ ...character });
    }
  }
}
