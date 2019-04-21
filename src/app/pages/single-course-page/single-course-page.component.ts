import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../entities/course.model';
import { ApplicationState } from '../../store/states';
import { UpdateCourse, AddCourse } from '../../store/actions/courses.actions';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit, OnDestroy {
  public course: Course;
  public courseForm: FormGroup;

  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    });

    if (this.isEditing()) {
      this.store.select('courses').pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(courses => {
        this.course = courses.selectedCourse;
        this.courseForm.setValue({
          name: this.course.name,
          description: this.course.description
        });
      });
    } else {
      this.course = {
        id: 0,
        date: new Date(0),
        description: '',
        isTopRated: false,
        length: 0,
        name: ''
      };
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  private isEditing(): boolean {
    return !this.router.url.includes('new');
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
    this.store.dispatch(new AddCourse(this.course));
  }

  saveExistingCourse() {
    this.store.dispatch(new UpdateCourse(this.course));
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
    return control.hasError('maxlength');
  }
}
