import { Component } from '@angular/core';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';
import { PopupService } from '../../services/popup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { CharacterFormComponent } from './form/character-form.component';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule, ModalActionsComponent, ReactiveFormsModule, CharacterFormComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent {

  constructor(public popupService: PopupService, public themeService: ThemeService) {

  }

}
