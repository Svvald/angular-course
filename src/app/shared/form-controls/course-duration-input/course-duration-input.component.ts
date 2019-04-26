import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validator, FormControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-course-duration-input',
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
      useExisting: forwardRef(() => CourseDurationInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseDurationInputComponent),
      multi: true
    }
  ]
})
export class CourseDurationInputComponent implements ControlValueAccessor, Validator {
  @Input() hasError: boolean;
  data: number = 0;

  private readonly VALIDATION_REGEX = /^[1-9]\d*$/;

  constructor() { }

  private onChange = (value: any) => { };

  writeValue(value: number): void {
    this.data = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  validate(c: FormControl): ValidationErrors {
    return this.VALIDATION_REGEX.test(c.value) ? null : {
      positiveInt: true
    };
  }

  updateValue(value: number) {
    this.data = value;
    this.onChange(value);
  }
}
