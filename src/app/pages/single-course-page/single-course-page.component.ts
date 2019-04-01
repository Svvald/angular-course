import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Course } from '../../entities/course.model';
import { CoursesService } from '../../services/courses-service/courses.service';
import { LoaderService } from '../../common/loader/service/loader.service';
import { ApplicationState } from '../../store/states';
import { UpdateCourse } from '../../store/actions/courses.actions';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit, OnDestroy {
  public id?: number;
  public name: string;
  public description: string;
  public date: Date;
  public length = 0;

  public course: Course = {
    id: 0,
    date: new Date(0),
    description: '',
    isTopRated: false,
    length: 0,
    name: ''
  };

  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private loaderService: LoaderService,
    private store: Store<ApplicationState>
  ) { }

  ngOnInit() {
    if (this.isEditing()) {
      this.store.select('courses').pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(courses =>
        this.course = courses.selectedCourse
      );
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
    this.loaderService.toggle(true);
    this.coursesService.createCourse(this.course).subscribe(
      res => {
        this.loaderService.toggle(false);
        this.router.navigateByUrl('courses');
      },
      err => console.log(err.message)
    );
  }

  saveExistingCourse() {
    this.store.dispatch(new UpdateCourse(this.course));
  }
}
