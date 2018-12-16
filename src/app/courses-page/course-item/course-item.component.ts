import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {

  @Input() data: Course;
  @Output() deleting = new EventEmitter<number>();

  public faPen = faPen;
  public faTrash = faTrash;

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(id: number) {
    this.deleting.emit(id);
  }

}
