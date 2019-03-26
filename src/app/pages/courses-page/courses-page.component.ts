import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../entities/course.model';

import { CoursesService } from '../../services/courses-service/courses.service';
import { LoaderService } from 'src/app/common/loader/service/loader.service';

import { OrderByPipe } from '../../pipes/orderby-pipe/orderby.pipe';
import { FilterPipe } from '../../pipes/filter-pipe/filter.pipe';

import { GetCourses } from '../../store/actions/courses.actions';
import { CoursesState } from '../../store/reducers/courses.reducer';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  public courses: Course[] = [];
  public showModal: boolean;

  private deletingCourseID: number;
  private count = 5;

  private readonly ORDER_BY_DATE = 'date';
  private readonly COUNT_INC = 5;

  private unsubscribe$ = new Subject();

  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private router: Router,
    private store: Store<CoursesState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetCourses(this.count));
    this.store.select('courses').pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(courses =>
      this.courses = courses.coursesList
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
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
    this.loaderService.toggle(true);
    concat(
      this.coursesService.deleteCourse(this.deletingCourseID),
      this.coursesService.getCourses(this.count)
    ).subscribe(
      res => {
        this.courses = res as Course[];
        this.loaderService.toggle(false);
      },
      err => console.error(err.message)
    );
  }

  onDeleteCancel() {
    this.showModal = false;
  }

  onCourseSearch(name: string) {
    this.loaderService.toggle(true);
    this.coursesService.searchCourses(name).subscribe(
      res => {
        this.courses = res;
        this.loaderService.toggle(false);
      },
      err => console.error(err.message)
    );
  }

  onAddCourse() {
    this.router.navigateByUrl('courses/new');
  }

  onEditCourse(id: number) {
    this.router.navigateByUrl(`courses/${id}`);
  }
}
