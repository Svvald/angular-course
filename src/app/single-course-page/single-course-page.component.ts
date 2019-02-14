import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-course-page',
  templateUrl: './single-course-page.component.html',
  styleUrls: ['./single-course-page.component.css']
})
export class SingleCoursePageComponent implements OnInit {
  public title: string;
  public description: string;
  public created: Date;
  public durationMinutes = 0;

  constructor() { }

  ngOnInit() {
  }

}
