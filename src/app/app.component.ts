import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { ICard } from './utils/interfaces';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  cards: ICard[] = [{
    info: {
      "count": 826,
      "pages": 42,
      "next": "https://rickandmortyapi.com/api/character/?page=20",
      "prev": "https://rickandmortyapi.com/api/character/?page=18"
    },
    results: [
      {
        "id": 361,
        "name": "Toxic Rick",
        "status": "Dead",
        "species": "Humanoid",
        "type": "Rick's Toxic Side",
        "gender": "Male",
        "origin": {
          "name": "Alien Spa",
          "url": "https://rickandmortyapi.com/api/location/64"
        },
        "location": {
          "name": "Earth",
          "url": "https://rickandmortyapi.com/api/location/20"
        },
        "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
        "episode": [
          "https://rickandmortyapi.com/api/episode/27"
        ],
        "url": "https://rickandmortyapi.com/api/character/361",
        "created": "2018-01-10T18:20:41.703Z"
      },
    ]
  }]
}
