import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { IAuthor } from 'src/app/entities/author.model';
import { AuthorsService } from 'src/app/services/authors-service/authors.service';

@Component({
  selector: 'app-course-authors-input',
  templateUrl: './course-authors-input.component.html',
  styleUrls: ['./course-authors-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorsInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourseAuthorsInputComponent),
      multi: true,
    },
  ],
})
export class CourseAuthorsInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  @Input() hasError: boolean;

  public data: IAuthor[] = [];
  public authors: IAuthor[];
  public keyUp$ = new Subject<KeyboardEvent>();
  public unsubscribe$ = new Subject();
  public isActive: boolean;

  constructor(private authorsService: AuthorsService) { }

  private onChange = (value: any) => { };

  ngOnInit() {
    this.keyUp$.pipe(
      takeUntil(this.unsubscribe$),
      map(event => {
        const target = event.target as HTMLInputElement;
        return target.value;
      }),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(string => this.authorsService.searchAuthors(string)),
    ).subscribe(res => {
      this.authors = res;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  writeValue(value: IAuthor[]): void {
    this.data = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) { }

  validate(c: FormControl): ValidationErrors {
    return this.data.length ? null : {
      emptyAuthors: true,
    };
  }

  addAuthor(author: IAuthor): void {
    if (!this.data.find(el => el.id === author.id)) {
      this.data = this.data.concat(author);
      this.authors = [];
      this.tagInputRef.nativeElement.value = '';
    }
    this.onChange(this.data);
  }

  removeAuthor(author: IAuthor): void {
    this.data = this.data.filter(el => el.id !== author.id);
    this.onChange(this.data);
  }

  onFocus(): void {
    this.isActive = true;
  }

  onBlur(): void {
    this.isActive = false;
  }
}
