import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

import { Course } from '../../entities/course.model';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onDelete(event: Event) {
    event.stopPropagation();
    this.deleteCourse.emit(this.data.id);
  }

  onEdit(event: Event) {
    event.stopPropagation();
    this.editCourse.emit(this.data.id);
  }

  onView(event: Event) {
    this.viewCourse.emit(this.data.id);
  }
}
