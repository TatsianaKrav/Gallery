import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PopupService } from '../../services/popup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {

  constructor(public popupService: PopupService) {

  }

  close() {
    this.popupService.handle();
  }

}
