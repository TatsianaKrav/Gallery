import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICard, ICardResponse } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<ICard[]> {
    return this.http.get<ICardResponse>("https://rickandmortyapi.com/api/character")
      .pipe(
        map((data) => data.results.slice(0, 100))
      )
  }
}
