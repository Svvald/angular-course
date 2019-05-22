import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, takeUntil, map, distinctUntilChanged, filter } from 'rxjs/operators';

import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-courses-controls',
  templateUrl: './courses-controls.component.html',
  styleUrls: ['./courses-controls.component.css']
})
export class CoursesControlsComponent implements OnInit, OnDestroy {
  @Output() searchCourses = new EventEmitter<string>();
  @Output() addCourse = new EventEmitter<void>();

  public keyUp$ = new Subject<KeyboardEvent>();
  public unsubscribe$ = new Subject();
  public isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.keyUp$.pipe(
      takeUntil(this.unsubscribe$),
      map(event => {
        const target = event.target as HTMLInputElement;
        return target.value;
      }),
      filter(string => string.length >= 3 || string.length === 0),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      res => this.searchCourses.emit(res)
    );

    this.isAdmin$ = this.authService.isAdmin();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  onAdd(): void {
    this.addCourse.emit();
  }
}
