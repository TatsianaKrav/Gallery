import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ICard, ICardResponse } from '../utils/interfaces';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment.development';
import { CommonPaginationResponse } from '../models/common-pagination-response';
import { CharacterModel } from '../models/character-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getAllCards(): Observable<CommonPaginationResponse<CharacterModel>> {
    return this.http.get<CommonPaginationResponse<CharacterModel>>(`${environment.API_URL}/character`);
  }

  getCharacter(name: string): Observable<CommonPaginationResponse<CharacterModel>> {
    return this.http.get<CommonPaginationResponse<CharacterModel>>(`${environment.API_URL}/character/?name=${name}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle('No cards found');
    return throwError(() => error.message);
  }
}
