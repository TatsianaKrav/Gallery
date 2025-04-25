import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ratingValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (+control.value === 0) {
            return { invalidRating: true };
        }
        return null;
    }
}

// todo валидатор для пароля и потоврения пароля, повесить на группу 

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