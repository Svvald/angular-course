import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '../../entities/course.model';

import { CoursesService } from '../../services/courses-service/courses.service';
import { OrderByPipe } from '../../pipes/orderby-pipe/orderby.pipe';
import { FilterPipe } from '../../pipes/filter-pipe/filter.pipe';
import { concat } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [];
  public showModal: boolean;

  private deletingCourseID: number;
  private count = 5;

  private readonly ORDER_BY_DATE = 'date';
  private readonly COUNT_INC = 5;

  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.coursesService.getCourses(this.count).subscribe(
      res => {
        this.courses = res;
      },
      err => console.error(err.message)
    );
  }

  onLoadMore() {
    this.count += this.COUNT_INC;
    this.coursesService.getCourses(this.count).subscribe(
      res => {
        // TODO: Change behavior of orderByPipe
        // this.courses = this.orderByPipe.transform(res, this.ORDER_BY_DATE);
        this.courses = res;
      },
      err => console.error(err.message)
    );
  }

  onDeleteCourse(id: number) {
    this.showModal = true;
    this.deletingCourseID = id;
  }

  // TODO: Rewrite modal position with scroll
  // TODO: Implement toast on delete success and fail
  onDeleteConfirm() {
    this.showModal = false;

    concat(
      this.coursesService.deleteCourse(this.deletingCourseID),
      this.coursesService.getCourses(this.count)
    ).subscribe(
      res => this.courses = res as Course[],
      err => console.error(err.message)
    );
  }

  onDeleteCancel() {
    this.showModal = false;
  }

  onCourseSearch(name: string) {
    this.coursesService.searchCourses(name).subscribe(
      res => {
        this.courses = res;
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
