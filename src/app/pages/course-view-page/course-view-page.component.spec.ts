import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseViewPageComponent } from './course-view-page.component';

describe('CourseViewPageComponent', () => {
  let component: CourseViewPageComponent;
  let fixture: ComponentFixture<CourseViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
