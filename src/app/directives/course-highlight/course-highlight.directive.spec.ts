import { Component } from '@angular/core';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseHighlightDirective } from './course-highlight.directive';

@Component({
  template: `
    <div [appCourseHighlight]="date"></div>
  `,
})
class TestHostComponent {
  public date;
}

describe('CourseHighlightDirective', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;

  const MILLISECOND_IN_DAY = 1000 * 60 * 60 * 24;
  const currentDate = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, CourseHighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
    element = fixture.nativeElement;
  }));

  it('should create an instance', () => {
    expect(testHost).toBeTruthy();
  });

  it('should make element border bold green if the course if fresh (<= 14 days)', () => {
    const desiredDate = new Date(currentDate.getDate() - 5 * MILLISECOND_IN_DAY);
    testHost.date = desiredDate;
    expect(element.style.border).toBe('2px solid #98ffb2');
  });

  it('should make element border bold lightblue if the course is not started yet', () => {
    const desiredDate = new Date(currentDate.getDate() + 5 * MILLISECOND_IN_DAY);
    testHost.date = desiredDate;
    expect(element.style.border).toBe('2px solid #98d0ff');
  });
});
