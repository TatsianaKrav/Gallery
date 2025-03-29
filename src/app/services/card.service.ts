import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ICard, ICardResponse } from '../utils/interfaces';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient,
    private errorService: ErrorService
  ) { }

  getAllCards(): Observable<ICard[]> {
    return this.http.get<ICardResponse>("https://rickandmortyapi.com/api/character")
      .pipe(
        map((data) => data.results.slice(0, 100))
      )
  }

  getCharacter(name: string): Observable<ICard[]> {
    return this.http.get<ICardResponse>(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .pipe(
        map((data) => data.results),
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle('No cards found');
    return throwError(() => error.message);
  }
}
