import { FormControl } from "@angular/forms";

export interface FormGroupModel {
    status?: FormControl<string | null | undefined>,
    species?: FormControl<string | null | undefined>,
    gender?: FormControl<string | null | undefined>,
    origin?: FormControl<string | null | undefined>,
    location?: FormControl<string | null | undefined>
}