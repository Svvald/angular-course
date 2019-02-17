import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-controls',
  templateUrl: './courses-controls.component.html',
  styleUrls: ['./courses-controls.component.css']
})
export class CoursesControlsComponent implements OnInit {
  @Output() searchCourses = new EventEmitter<string>();
  @Output() addCourse = new EventEmitter<void>();

  public searchingCourseName = '';

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    this.searchCourses.emit(this.searchingCourseName);
  }

  onAdd(): void {
    this.addCourse.emit();
  }

}
