import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/entities/course.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/states';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-view-page',
  templateUrl: './course-view-page.component.html',
  styleUrls: ['./course-view-page.component.css']
})
export class CourseViewPageComponent implements OnInit, OnDestroy {
  public course: Course;

  private unsubscribe$ = new Subject();

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.select('courses').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      courses => this.course = courses.selectedCourse
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
