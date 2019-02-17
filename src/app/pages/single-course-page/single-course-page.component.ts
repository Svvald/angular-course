import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ICourse } from '../../entities/course.model';

import { CoursesService } from '../../services/courses-service/courses.service';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit {
  public id?: number;
  public title: string;
  public description: string;
  public created: Date;
  public durationMinutes = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      const numberId = parseInt(data.id, 10);
      if (typeof numberId === 'number') {
        const course = this.coursesService.getCourse(numberId);

        this.id = course.id;
        this.title = course.title;
        this.description = course.description;
        this.created = course.created;
        this.durationMinutes = course.duration;
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

  saveNewCourse() {
    const data: ICourse = {
      id: this.coursesService.getCourses().length,
      title: this.title,
      description: this.description,
      created: this.created,
      duration: this.durationMinutes,
      topRated: false
    };

    this.coursesService.createCourse(data);
    this.router.navigateByUrl('courses');
  }

  saveExistingCourse() {
    this.coursesService.updateCourse(this.id, {
      title: this.title,
      description: this.description,
      created: this.created,
      duration: this.durationMinutes
    });

    this.router.navigateByUrl('courses');
  }
}
