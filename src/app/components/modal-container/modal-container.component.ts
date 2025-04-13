import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { ModalActionsComponent } from './modal-actions/modal-actions.component';
import { FormComponent } from './form/form.component';
import { PopupService } from '../../services/popup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharacterModel } from '../../models/character-model';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule, ModalActionsComponent, FormComponent, ReactiveFormsModule],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss'
})
export class ModalContainerComponent {

  constructor(public popupService: PopupService) {

  }

}
