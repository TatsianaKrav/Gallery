import { FormControl } from "@angular/forms";

export interface CharacterFormModel {
    status: FormControl<string | null>,
    species: FormControl<string | null>,
    gender: FormControl<string | null>,
    origin: FormControl<string | null>,
    location: FormControl<string | null>,
    rating: FormControl<string | null>
}