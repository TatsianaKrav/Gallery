import { AfterContentChecked, Component, ContentChild, input } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-control-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './control-wrapper.component.html',
  styleUrl: './control-wrapper.component.scss'
})
export class ControlWrapperComponent implements AfterContentChecked {

  readonly invalidForm = input.required<boolean>();

  @ContentChild(NgControl)
  ngControl: NgControl | undefined;

  errorMessage = '';
  currentError = '';

  validationMessages = {
    required: 'This field must to be filled',
    invalidLength: 'The required length is ',
    pattern: 'You must put the correct value',
    invalidRating: 'You must rate this character',
    genderError: 'The gender can be only Male or Female',
    statusError: 'The status can be only Alive or Dead',
  }

  ngAfterContentChecked(): void {
    const currentError = this.ngControl?.control?.errors;
    this.errorMessage =
      currentError && (this.ngControl?.touched || this.ngControl?.dirty || this.invalidForm())
        ? this.checkError(currentError)
        : '';


    if (this.currentError === 'invalidLength' && currentError) {
      this.errorMessage += ` ${currentError['invalidLength']}`
    }
  }

  checkError(error: ValidationErrors): string {
    const errorKey = Object.keys(error)[0];

    for (let [key, value] of Object.entries(this.validationMessages)) {
      if (key === errorKey) {
        this.currentError = key;
        return value;
      }
    }

    return '';
  }
}
