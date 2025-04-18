import { Component } from '@angular/core';
import { FormService } from '../../../services/form-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-actions.component.html',
  styleUrl: './modal-actions.component.scss'
})
export class ModalActionsComponent {
  isEditable = false;

  constructor(public formService: FormService) {

  }

  handleAction(event: Event): void {
    const targetElement = event.currentTarget;

    if (targetElement && targetElement instanceof HTMLElement) {
      const actionName = targetElement.className.split(' ')[0];

      this.formService.action$.next(actionName);
    }
  }
}
