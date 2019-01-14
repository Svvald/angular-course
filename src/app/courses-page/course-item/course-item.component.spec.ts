import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { Course } from '../course.model';

describe('CourseItemComponent AS CLASS', () => {
  let component: CourseItemComponent;

  beforeEach(() => {
    component = new CourseItemComponent();
    component.data = { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have course with data: { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) }`, () => {
    expect(component.data.id).toEqual(0);
    expect(component.data.title).toEqual('Course #1');
    expect(component.data.description).toEqual('Description');
    expect(component.data.duration).toEqual(60);
    expect(component.data.created).toEqual(new Date(0));
  });

  it('should raise deleting course event', () => {
    component.deleting.subscribe(id => expect(id).toEqual(0));
    component.deleteCourse(component.data.id);
  });
});

describe('CourseItemComponent AS STAND ALONE', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent
      ],
      imports: [
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.data = { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have course with data: { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) }`, () => {
    expect(component.data.id).toEqual(0);
    expect(component.data.title).toEqual('Course #1');
    expect(component.data.description).toEqual('Description');
    expect(component.data.duration).toEqual(60);
    expect(component.data.created).toEqual(new Date(0));
  });

  it('should display predefined data', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;

    const title: HTMLElement = nativeElement.querySelector('.course-item__title');
    expect(title.textContent).toBe('Course #1');

    const description: HTMLElement = nativeElement.querySelector('.course-item__description');
    expect(description.textContent).toBe(' Description ');

    const duration: HTMLElement = nativeElement.querySelector('.course-item__duration');
    expect(duration.textContent).toBe('60 min');

    const created: HTMLElement = nativeElement.querySelector('.course-item__created');
    expect(created.textContent).toBe(new Date(0).toLocaleDateString());
  });

  it('should raise deleting course event on click', () => {
    const deleteButton: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item__button')[1];

    // Should I create spy on component method for expect(spy).haveBeenCalled()?
    component.deleting.subscribe(id => expect(id).toEqual(0));
    deleteButton.click();
  });
});

@Component({
  template: `
    <app-course-item [data]="course" (deleting)="onDeleting($event)"></app-course-item>
  `
})
class TestHostComponent {
  public course: Course = { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) };
  public onDeleting(id: number) { console.log(`Deleting course: ${id}`); }
}
describe('CourseItemComponent AS TEST HOST COMPONENT', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        TestHostComponent
      ],
      imports: [
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should display passed data', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;

    const title: HTMLElement = nativeElement.querySelector('.course-item__title');
    expect(title.textContent).toBe('Course #1');

    const description: HTMLElement = nativeElement.querySelector('.course-item__description');
    expect(description.textContent).toBe(' Description ');

    const duration: HTMLElement = nativeElement.querySelector('.course-item__duration');
    expect(duration.textContent).toBe('60 min');

    const created: HTMLElement = nativeElement.querySelector('.course-item__created');
    expect(created.textContent).toBe(new Date(0).toLocaleDateString());
  });

  it('should raise deleteing course event on click', () => {
    console.log = jasmine.createSpy('log');

    const deleteButton: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item__button')[1];
    deleteButton.click();
    expect(console.log).toHaveBeenCalledWith('Deleting course: 0');
  });
});
