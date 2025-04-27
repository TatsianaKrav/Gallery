import { AbstractControl, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ratingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (+control.value === 0) {
            return { invalidRating: true };
        }
        return null;
    }
}


export function lengthValidator(length: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value.length < length || control.value.length > length) {
            return { invalidLength: length };
        }
        return null;
    }
}


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (control instanceof FormGroup) {
            const password = control.controls['pass'];
            const repeatPassword = control.controls['repeatPass'];

            return password.value === repeatPassword.value ? null : { invalidPassword: true }
        }

        return { invalidPassword: true };
    }
}

export function genderValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = /^[Mm]ale|[Ff]emale$/.test(control.value);
        return result ? null : { genderError: true };
    }
}

export function statusValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const result = /^[Aa]live|[Dd]ead$/.test(control.value);
        return result ? null : { statusError: true };
    }
}