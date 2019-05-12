import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../entities/course.model';
import { ApplicationState } from '../../store/states';
import { UpdateCourse, AddCourse } from '../../store/actions/courses.actions';
import { IAuthor } from 'src/app/entities/author.model';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit, OnDestroy {
  public course: Course;
  public courseForm: FormGroup;
  public availableAuthors: IAuthor[];

  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      length: new FormControl(0, [Validators.required]),
      date: new FormControl(this.dateToString(new Date(0)), [Validators.required]),
      authors: new FormControl([]),
    });

    if (this.isEditing()) {
      this.store.select('courses').pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(courses => {
        this.course = courses.selectedCourse;
        this.courseForm.setValue({
          name: this.course.name,
          description: this.course.description,
          length: this.course.length,
          date: this.dateToString(this.course.date),
          authors: this.course.authors,
        });
      });
    } else {
      this.course = {
        id: 0,
        date: new Date(0),
        description: '',
        isTopRated: false,
        length: 0,
        name: '',
        authors: []
      };
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  private isEditing(): boolean {
    return !this.router.url.includes('new');
  }

  outError(c: FormControl) {
    console.log(c.errors);
  }

  onCancel() {
    this.router.navigateByUrl('courses');
  }

  onSave() {
    this.isEditing() ?
    this.saveExistingCourse() :
    this.saveNewCourse();
  }

  // TODO: Implement toast on create/update success and fail
  saveNewCourse() {
    const newCourse = {
      ...this.course,
      name: this.courseForm.get('name').value,
      description: this.courseForm.get('description').value,
      length: this.courseForm.get('length').value,
      date: this.stringToDate(this.courseForm.get('date').value),
      authors: this.courseForm.get('authors').value,
    };

    this.store.dispatch(new AddCourse(newCourse));
  }

  saveExistingCourse() {
    const updatedCourse = {
      ...this.course,
      name: this.courseForm.get('name').value,
      description: this.courseForm.get('description').value,
      length: this.courseForm.get('length').value,
      date: this.stringToDate(this.courseForm.get('date').value),
      authors: this.courseForm.get('authors').value,
    };

    this.store.dispatch(new UpdateCourse(updatedCourse));
  }

  dateToString(date: Date): string {
    date = new Date(date);

    let dayStr, monthStr, yearStr;

    const day = date.getDate();
    dayStr = day < 10 ? `0${day}` : `${day}`;

    const month = date.getMonth();
    monthStr = month < 10 ? `0${month + 1}` : `${month + 1}`;

    const year = date.getFullYear();
    yearStr = year.toString();

    return `${dayStr}/${monthStr}/${yearStr}`;
  }

  stringToDate(dateString: string): Date {
    const dateParts = dateString.split('/');

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    return new Date(year, month, day);
  }

  hasErrors(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.invalid;
  }

  requiredFailed(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.hasError('required');
  }

  maxLengthFailed(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.hasError('maxlength');
  }

  positiveIntFailed(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.hasError('positiveInt');
  }

  dateFormatFailed(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.hasError('dateFormat');
  }

  emptyAuthorsFailed(controlName: string): boolean {
    const control = this.courseForm.get(controlName);
    return control.dirty && control.hasError('emptyAuthors');
  }
}
