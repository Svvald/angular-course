import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Course } from '../../entities/course.model';
import { OrderByPipe } from '../../pipes/orderby-pipe/orderby.pipe';
import { DeleteCourse, EditCourse, LoadMore, SearchCourses, ViewCourse, GetCourses } from '../../store/actions/courses.actions';
import { ICoursesState } from '../../store/reducers/courses.reducer';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public showModal: boolean;

  private deletingCourseID: number;
  private readonly ORDER_BY_DATE = 'date';

  constructor(
    private orderByPipe: OrderByPipe,
    private router: Router,
    private store: Store<ICoursesState>,
  ) { }

  ngOnInit() {
    this.store.select('courses').subscribe(res => {
        this.courses = res.coursesList;
    });

    if (!this.courses.length) {
      this.store.dispatch(new GetCourses(5));
    }
  }

  onLoadMore() {
    this.store.dispatch(new LoadMore());
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

  onViewCourse(id: number) {
    this.store.dispatch(new ViewCourse(id));
  }
}
