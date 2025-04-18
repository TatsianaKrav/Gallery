import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-actions.component.html',
  styleUrl: './modal-actions.component.scss'
})
export class ModalActionsComponent {
  readonly isEditable = input.required<boolean>()
}
