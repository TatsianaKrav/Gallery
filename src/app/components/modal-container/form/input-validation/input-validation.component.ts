import { AfterContentChecked, Component, ContentChild } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  standalone: true,
  imports: [],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.scss'
})
export class InputValidationComponent implements AfterContentChecked {
  @ContentChild(NgControl)
  ngControl: NgControl | undefined;
  errorMessage = '';
  validationMessages = {
    required: 'This field must to be filled',
    minlength: 'The minumum length is 4',
    pattern: 'You must put the correct value',
    invalidRating: 'You must rate this character'
  }


  ngAfterContentChecked(): void {
    const currentError = this.ngControl?.control?.errors;

    if (currentError) {
      this.checkError(currentError);
    } else {
      this.errorMessage = '';
    }
  }

  checkError(error: ValidationErrors): void {
    const errorKey = Object.keys(error)[0];

    for (let [key, value] of Object.entries(this.validationMessages)) {
      if (key === errorKey) {
        this.errorMessage = value;
      }
    }
  }
}
