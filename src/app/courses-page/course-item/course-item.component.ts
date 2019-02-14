import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { faPen, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';

import { Course } from '../course.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {

  @Input() data: Course;
  @Output() deleting = new EventEmitter<number>();

  public faPen = faPen;
  public faTrash = faTrash;
  public faStar = faStar;

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(id: number) {
    this.deleting.emit(id);
  }

}
