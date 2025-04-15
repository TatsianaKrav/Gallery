import { Component, forwardRef, Self } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements ControlValueAccessor {

  public currentRate = 0;
  public disabled = false; //!!!
  public ratesArray = Array.from({ length: 5 });
  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  public rateChange(index: number): void {

    if (!this.disabled) {
      this.currentRate = index;
      this.onChange(this.currentRate);
    }
  }

  public writeValue(rate: number): void {
    this.currentRate = rate;
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
