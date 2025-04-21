import { AfterViewChecked, AfterViewInit, Component, ElementRef, forwardRef, input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class RatingComponent implements ControlValueAccessor, AfterViewChecked {

  public disabled = false;
  public ratesArray = Array.from({ length: 5 });
  private onChange!: (value: number) => void;
  private onTouched!: () => void;
  public currentRate = 0;
  public isParentForm = true;
  readonly updatedRate = input.required<number>();
  @ViewChild('rate') rate!: ElementRef;


  public rateChange(event: Event, index: number): void {
    const targetElement = event.currentTarget;

    if (targetElement instanceof HTMLElement) {
      const parent = targetElement.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;

      if (parent && !this.checkParent(parent)) return;
    }

    if (!this.disabled) {
      this.currentRate = index;
      this.onChange(this.currentRate);
    }
  }

  ngAfterViewChecked(): void {
    const parent = this.rate.nativeElement.parentElement.parentElement;
    this.isParentForm = this.checkParent(parent);
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

  private checkParent(element: HTMLElement): boolean {
    return (element.classList.contains('form') || element.classList.contains('label-form'));
  }
}
