import { Component, OnInit } from '@angular/core';

import { Course } from './course.model';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css']
})
export class CoursesPageComponent implements OnInit {
  public courses: Course[] = [
    {
      id: 1,
      title: 'Course #1',
      created: new Date(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nulla quis.'
    },
    {
      id: 2,
      title: 'Course #2',
      created: new Date(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nulla quis.'
    },
    {
      id: 3,
      title: 'Course #3',
      created: new Date(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nulla quis.'
    },
    {
      id: 4,
      title: 'Course #4',
      created: new Date(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nulla quis.'
    },
    {
      id: 4,
      title: 'Course #5',
      created: new Date(),
      duration: 60,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum nulla quis.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
