import { Component, OnInit } from '@angular/core';

import { Course } from './course.model';
import { OrderByPipe } from './orderby-pipe/orderby.pipe';
import { FilterPipe } from './filter-pipe/filter.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
  providers: [OrderByPipe, FilterPipe]
})
export class CoursesPageComponent implements OnInit {
  private initialData: Course[];
  public courses: Course[];

  constructor(private orderByPipe: OrderByPipe, private filterPipe: FilterPipe) { }

  ngOnInit() {
    this.initialData = [
      {
        id: 1,
        title: 'Course #1',
        created: new Date(1546300800000),
        duration: 60,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
          Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
        topRated: true
      },
      {
        id: 2,
        title: 'Course #2',
        created: new Date(1543622400000),
        duration: 120,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
        topRated: false
      },
      {
        id: 3,
        title: 'Course #3',
        created: new Date(1543622400000),
        duration: 127,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
        topRated: true
      },
      {
        id: 4,
        title: 'Course #4',
        created: new Date(1551312000000),
        duration: 30,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
        topRated: false
      },
      {
        id: 5,
        title: 'Course #5',
        created: new Date(),
        duration: 333,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Morbi risus diam, rhoncus vel lectus vel, varius interdum est.
        Praesent magna odio, porta in convallis et, varius eu enim. Ut id.`,
        topRated: false
      }
    ];
    this.courses = this.orderByPipe.transform(this.initialData, 'created');
  }

  onLoadMore() {
    console.log('Loading more courses');
  }

  onDeleting(id: number) {
    console.log(`Deleting course: ${id}`);
  }

  onCourseSearch(name: string) {
    this.courses = this.filterPipe.transform(this.initialData, ['title', name]);
  }

}
