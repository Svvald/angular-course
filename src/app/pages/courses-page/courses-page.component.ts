import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from '../../entities/course.model';
import { OrderByPipe } from '../../pipes/orderby-pipe/orderby.pipe';
import { FilterPipe } from '../../pipes/filter-pipe/filter.pipe';
import { GetCourses, EditCourse, DeleteCourse, SearchCourses } from '../../store/actions/courses.actions';
import { CoursesState } from '../../store/reducers/courses.reducer';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public showModal: boolean;

  private deletingCourseID: number;

  // TODO: Maybe move it to store and use in effects
  private count = 5;

  private readonly ORDER_BY_DATE = 'date';
  private readonly COUNT_INC = 5;

  public courses$: Observable<Course[]>;

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private store: Store<CoursesState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetCourses(this.count));
    this.courses$ = this.store.select('courses').pipe(
      map(courses => courses.coursesList)
    );
  }

  onLoadMore() {
    this.count += this.COUNT_INC;
    this.store.dispatch(new GetCourses(this.count));
    // TODO: Change behavior of orderByPipe
    // this.courses = this.orderByPipe.transform(res, this.ORDER_BY_DATE);
  }

  onDeleteCourse(id: number) {
    this.showModal = true;
    this.deletingCourseID = id;
  }

  // TODO: Implement toast on delete success and fail
  onDeleteConfirm() {
    this.showModal = false;
    this.store.dispatch(new DeleteCourse(this.deletingCourseID));
    this.store.dispatch(new GetCourses(this.count));
  }

  onDeleteCancel() {
    this.showModal = false;
  }

  onCourseSearch(name: string) {
    this.store.dispatch(new SearchCourses(name));
  }

  onAddCourse() {
    this.router.navigateByUrl('courses/new');
  }

  onEditCourse(id: number) {
    this.store.dispatch(new EditCourse(id));
  }
}
