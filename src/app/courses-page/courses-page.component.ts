import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from './course.model';
import { CoursesService } from '../services/courses-service/courses.service';
import { OrderByPipe } from '../pipes/orderby-pipe/orderby.pipe';
import { FilterPipe } from '../pipes/filter-pipe/filter.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[];
  public showModal: boolean;
  private deletingCourseID: number;

  private readonly ORDER_BY_DATE = 'created';

  constructor(
    private orderByPipe: OrderByPipe,
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courses = this.orderByPipe.transform(this.coursesService.getCourses(), this.ORDER_BY_DATE);
  }

  onLoadMore() {
    console.log('Loading more courses');
  }

  onDeleteCourse(id: number) {
    this.showModal = true;
    this.deletingCourseID = id;
  }

  onDeleteConfirm() {
    this.showModal = false;
    this.coursesService.deleteCourse(this.deletingCourseID);
    this.courses = this.orderByPipe.transform(this.coursesService.getCourses(), this.ORDER_BY_DATE);
  }

  onDeleteCancel() {
    this.showModal = false;
  }

  onCourseSearch(name: string) {
    this.courses = this.filterPipe.transform(this.courses, ['title', name]);
  }

  onAddCourse() {
    this.router.navigateByUrl('courses/new');
  }

  onEditCourse(id: number) {
    this.router.navigateByUrl(`courses/${id}`);
  }

}
