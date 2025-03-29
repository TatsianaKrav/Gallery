import { Component, input, OnInit } from '@angular/core';
import { ICard } from '../../utils/interfaces';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  readonly card = input<ICard>();
  public cardElement: ICard | undefined;


  constructor() {
  }

  ngOnInit(): void {
    this.cardElement = this.card();
    console.log(this.cardElement);
  }
}


/* ?? {
  info: {
    "count": 0,
    "pages": 0,
    "next": "",
    "prev": ""
  },
  results: [
    {
      "id": 0,
      "name": "",
      "status": "",
      "species": "",
      "type": "",
      "gender": "",
      "origin": {
        "name": "",
        "url": ""
      },
      "location": {
        "name": "",
        "url": ""
      },
      "image": "",
      "episode": [
        ""
      ],
      "url": "",
      "created": ""
    },
  ]
} */