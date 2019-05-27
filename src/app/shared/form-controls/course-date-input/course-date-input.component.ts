import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-course-date-input',
  template: `<input type="text"
                    [ngClass]="{ 'error': hasError }"
                    [value]="data"
                    (keyup)="updateValue($event.target.value)"
              >`,
  styles: [`
    .error {
      border-color: #e10000;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDateInputComponent),
      multi: true,
    },
  ],
})
export class CourseDateInputComponent implements ControlValueAccessor, Validator {
  @Input() hasError: boolean;
  public data = '';

  private readonly VALIDATION_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  constructor() { }

  private onChange = (value: any) => { };

  writeValue(value: string): void {
    this.data = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  validate(c: FormControl): ValidationErrors {
    return this.VALIDATION_REGEX.test(c.value) ? null : {
      dateFormat: true,
    };
    // TODO: Make advanced validation e.g. 30 days in February etc.
  }

  updateValue(value: string) {
    this.data = value;
    this.onChange(value);
  }

}
