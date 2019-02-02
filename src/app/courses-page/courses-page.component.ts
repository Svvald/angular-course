import { Component, OnInit } from '@angular/core';

import { Course } from './course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[];

  constructor() { }

  ngOnInit() {
    this.courses = [
      {
        id: 1,
        title: 'Course #1',
        created: new Date(1546300800000),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
          Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`
      },
      {
        id: 2,
        title: 'Course #2',
        created: new Date(1543622400000),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`
      },
      {
        id: 3,
        title: 'Course #3',
        created: new Date(1543622400000),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`
      },
      {
        id: 4,
        title: 'Course #4',
        created: new Date(1551312000000),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`
      },
      {
        id: 5,
        title: 'Course #5',
        created: new Date(),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`
      }
    ];
  }

  onLoadMore() {
    console.log('Loading more courses');
  }

  onDeleting(id: number) {
    console.log(`Deleting course: ${id}`);
  }

}
