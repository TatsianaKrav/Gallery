import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
   action$ = new Subject<string>();
   isEditable$ = new BehaviorSubject(false);

  constructor() { }
}
