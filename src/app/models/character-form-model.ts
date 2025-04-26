import { FormControl, FormGroup } from "@angular/forms";

export interface CharacterFormModel {
    status: FormControl<string | null>,
    species: FormControl<string | null>,
    gender: FormControl<string | null>,
    origin: FormControl<string | null>,
    location: FormControl<string | null>,
    rating: FormControl<string | null>,
    pass: FormControl<string | null>,
    repeatPass: FormControl<string | null>
}

/* interface PasswordFormModel {
    pass: FormControl<string | null>,
    repeatPass: FormControl<string | null>
} */