import { Component } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss'
})
export class ErrorComponent {
  constructor(public errorService: ErrorService) { }
}
