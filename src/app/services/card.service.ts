import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment.development';
import { CommonPaginationResponse } from '../models/common-pagination-response';
import { CharacterModel } from '../models/character-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  allCards$ = new BehaviorSubject<CommonPaginationResponse<CharacterModel> | null>(null);

  constructor(private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getAllCards(): Observable<CommonPaginationResponse<CharacterModel>> {
    return this.http.get<CommonPaginationResponse<CharacterModel>>(environment.API_URL)
      .pipe(
        tap(value => this.allCards$.next({ ...value }))
      )
  }

  getCharacter(name: string): Observable<CommonPaginationResponse<CharacterModel>> {
    return this.http.get<CommonPaginationResponse<CharacterModel>>(`${environment.API_URL}?name=${name}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  getCharacterById(id: number): Observable<CharacterModel> {
    return this.http.get<CharacterModel>(`${environment.API_URL}${id}`)
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle('No cards found');
    return throwError(() => error.message);
  }
}
