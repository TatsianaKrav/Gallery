import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ratingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (+control.value === 0) {
            return { invalidRating: true };
        }
        return null;
    }
}