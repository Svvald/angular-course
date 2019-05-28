import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAuthorsInputComponent } from './course-authors-input.component';

xdescribe('CourseAuthorsInputComponent', () => {
  let component: CourseAuthorsInputComponent;
  let fixture: ComponentFixture<CourseAuthorsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAuthorsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAuthorsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
