import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses-service/courses.service';
import { LoaderService } from 'src/app/common/loader/service/loader.service';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit {
  public id?: number;
  public name: string;
  public description: string;
  public date: Date;
  public length = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const id = parseInt(data.id, 10);
      if (!isNaN(id)) {
        this.loaderService.toggle(true);
        this.coursesService.getCourse(id).subscribe(
          res => {
            this.id = res.id;
            this.name = res.name;
            this.description = res.description;
            this.date = res.date;
            this.length = res.length;

            this.loaderService.toggle(false);
          },
          err => console.error(err)
        );
      }
    });
  }

  onCancel() {
    this.router.navigateByUrl('courses');
  }

  onSave() {
    this.router.url.includes('new') ?
    this.saveNewCourse() :
    this.saveExistingCourse();
  }

  // TODO: Implement toast on create/update success and fail
  saveNewCourse() {
    this.loaderService.toggle(true);
    this.coursesService.createCourse({
      id: 0,
      name: this.name,
      description: this.description,
      date: this.date,
      length: this.length,
      isTopRated: false
    }).subscribe(
      res => {
        this.loaderService.toggle(false);
        this.router.navigateByUrl('courses');
      },
      err => console.log(err.message)
    );
  }

  saveExistingCourse() {
    this.loaderService.toggle(true);
    this.coursesService.updateCourse({
      id: this.id,
      name: this.name,
      description: this.description,
      date: this.date,
      length: this.length,
      isTopRated: false
    }).subscribe(
      res => {
        this.loaderService.toggle(false);
        this.router.navigateByUrl('courses');
      },
      err => console.log(err.message)
    );
  }
}
