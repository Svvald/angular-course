import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-controls',
  templateUrl: './courses-controls.component.html',
  styleUrls: ['./courses-controls.component.css']
})
export class CoursesControlsComponent implements OnInit {
  @Output() searchCourses = new EventEmitter<string>();

  public searchingCourseName = '';

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.searchCourses.emit(this.searchingCourseName);
  }

}
