import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { faPen, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Course } from '../../entities/course.model';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {

  @Input() data: Course;
  @Output() deleteCourse = new EventEmitter<number>();
  @Output() editCourse = new EventEmitter<number>();
  @Output() viewCourse = new EventEmitter<number>();

  public faPen = faPen;
  public faTrash = faTrash;
  public faStar = faStar;
  public isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAdmin$ = this.authService.isAdmin();
  }

  onDelete(id: number) {
    this.deleteCourse.emit(id);
  }

  onEdit(id: number) {
    this.editCourse.emit(id);
  }

  onView(id: number) {
    this.viewCourse.emit(id);
  }
}
