import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCoursePageComponent } from './single-course-page.component';

describe('SingleCoursePageComponent', () => {
  let component: SingleCoursePageComponent;
  let fixture: ComponentFixture<SingleCoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCoursePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
