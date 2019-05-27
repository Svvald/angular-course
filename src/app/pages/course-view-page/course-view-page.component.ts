import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Course } from 'src/app/entities/course.model';
import { IAppState } from 'src/app/store/states';

@Component({
  selector: 'app-course-view-page',
  templateUrl: './course-view-page.component.html',
  styleUrls: ['./course-view-page.component.css'],
})
export class CourseViewPageComponent implements OnInit, OnDestroy {
  public course: Course;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select('courses').pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      courses => this.course = courses.selectedCourse,
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
