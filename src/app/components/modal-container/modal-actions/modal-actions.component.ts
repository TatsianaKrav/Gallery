import { Component } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { FormService } from '../../../services/form-service';

@Component({
  selector: 'app-modal-actions',
  standalone: true,
  imports: [],
  templateUrl: './modal-actions.component.html',
  styleUrl: './modal-actions.component.scss'
})
export class ModalActionsComponent {
  isEditable = false;

  constructor(public popupService: PopupService, public formService: FormService) {
    this.popupService.popup$.subscribe(state => {
      if (!state) {
        this.isEditable = false;
        this.formService.isEditable$.next(false);
      }
    })
  }

  handleAction(event: Event): void {
    const targetElement = event.currentTarget;

    if (targetElement && targetElement instanceof HTMLElement) {
      const actionName = targetElement.className.split(' ')[0];

      this.formService.action$.next(actionName);
    }
  }
}
