import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPageComponent } from './courses-page.component';

xdescribe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 5 courses', () => {
    const COURSES_LENGTH = 5;
    expect(component.courses.length).toEqual(COURSES_LENGTH);
  });

  it('should delete correct course by clicking on course', () => {
    console.log = jasmine.createSpy('log');
    const COURSE_ID_TO_DELETE = 3;
    component.onDeleteCourse(COURSE_ID_TO_DELETE);
    expect(console.log).toHaveBeenCalledWith('Deleting course: 3');
  });

  it('should load more courses by clicking on button', () => {
    console.log = jasmine.createSpy('log');
    component.onLoadMore();
    expect(console.log).toHaveBeenCalledWith('Loading more courses');
  });
});
