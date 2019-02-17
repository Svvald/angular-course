import { Injectable } from '@angular/core';
import { Course } from 'src/app/courses-page/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  private courses: Course[] = [
    {
      id: 0,
      title: 'Course #1',
      created: new Date(1546300800000),
      duration: 60,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
      topRated: true
    },
    {
      id: 1,
      title: 'Course #2',
      created: new Date(1543622400000),
      duration: 120,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
      Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
      topRated: false
    },
    {
      id: 2,
      title: 'Course #3',
      created: new Date(1543622400000),
      duration: 127,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
      Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
      topRated: true
    },
    {
      id: 3,
      title: 'Course #4',
      created: new Date(1551312000000),
      duration: 30,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
      Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
      topRated: false
    },
    {
      id: 4,
      title: 'Course #5',
      created: new Date(),
      duration: 333,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
      Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
      topRated: false
    }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  createCourse(data: Course): void {
    this.courses = this.courses.concat(data);
  }

  getCourse(id: number): Course {
    return this.courses.find((course) => course.id === id);
  }

  updateCourse(id: number, data: any): void {
    const courseIndexToUpdate = this.courses.findIndex((course) => course.id === id);
    this.courses = [
      ...this.courses.slice(0, courseIndexToUpdate),
      { ...this.courses[courseIndexToUpdate], ...data },
      ...this.courses.slice(courseIndexToUpdate + 1, this.courses.length)
    ];
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter((course) => course.id !== id);
  }
}
