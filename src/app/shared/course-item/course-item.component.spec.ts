/* tslint:disable:no-duplicate-string no-identical-functions max-classes-per-file */
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Course } from '../../entities/course.model';
import { AuthService } from '../../services/auth-service/auth.service';
import { CourseItemComponent } from './course-item.component';
import { Observable } from 'rxjs';
import { CourseHighlightDirective } from 'src/app/directives/course-highlight/course-highlight.directive';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

class MockAuthService extends AuthService {}

xdescribe('CourseItemComponent AS CLASS', () => {
  let component: CourseItemComponent;
  const authService: MockAuthService = null;

  beforeEach(() => {
    component = new CourseItemComponent(authService);
    component.data = {
      id: 0,
      name: 'Course #1',
      description: 'Description',
      length: 60,
      date: new Date(0),
      isTopRated: false,
      authors: [],
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have course with data: { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) }`, () => {
    expect(component.data.id).toEqual(0);
    expect(component.data.name).toEqual('Course #1');
    expect(component.data.description).toEqual('Description');
    expect(component.data.length).toEqual(60);
    expect(component.data.date).toEqual(new Date(0));
    expect(component.data.isTopRated).toEqual(false);
    expect(component.data.authors).toEqual([]);
  });

  it('should raise deleting course event', () => {
    component.deleteCourse.subscribe(id => expect(id).toEqual(0));
    component.onDelete(component.data.id);
  });
});

xdescribe('CourseItemComponent AS STAND ALONE', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
      ],
      imports: [
        FontAwesomeModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.data = {
      id: 0,
      name: 'Course #1',
      description: 'Description',
      length: 60,
      date: new Date(0),
      isTopRated: false,
      authors: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have course with data: { id: 0, title: 'Course #1', description: 'Description', duration: 60, created: new Date(0) }`, () => {
    expect(component.data.id).toEqual(0);
    expect(component.data.name).toEqual('Course #1');
    expect(component.data.description).toEqual('Description');
    expect(component.data.length).toEqual(60);
    expect(component.data.date).toEqual(new Date(0));
    expect(component.data.isTopRated).toEqual(false);
    expect(component.data.authors).toEqual([]);
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
    component.deleteCourse.subscribe(id => expect(id).toEqual(0));
    deleteButton.click();
  });
});

@Component({
  template: `
    <app-course-item [data]="course"
                     (deleteCourse)="onDeleting($event)"
                     (editCourse)="onEditing($event)"
                     (viewCourse)="onViewing($event)"
    >
    </app-course-item>
  `,
})
class TestHostComponent {
  public course: Course = {
    id: 0,
    name: 'Course #1',
    description: 'Description',
    length: 60,
    date: new Date(0),
    isTopRated: false,
    authors: [],
  };
  public isAdmin: Observable<boolean>;
  public onDeleting(id: number) {
    console.log(`Deleting course: ${id}`);
  }
  public onViewing(id: number) {
    console.log(`Viewing course: ${id}`);
  }
  public onEditing(id: number) {
    console.log(`Editing course: ${id}`);
  }
}

describe('CourseItemComponent AS TEST HOST COMPONENT', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        TestHostComponent,
      ],
      imports: [
        HttpClientTestingModule,
        DirectivesModule,
        PipesModule,
        FontAwesomeModule,
      ],
      providers: [provideMockStore({})],
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
    expect(title.innerText).toBe('COURSE #1');

    const description: HTMLElement = nativeElement.querySelector('.course-item__description');
    expect(description.innerText).toBe('Description');

    const duration: HTMLElement = nativeElement.querySelector('.course-item__duration');
    expect(duration.innerText).toBe('1h');

    const created: HTMLElement = nativeElement.querySelector('.course-item__created');
    expect(created.innerText).toBe('1/1/70');
  });

  it('should have special class and star sign if course is topRated', () => {
    testHost.course.isTopRated = true;
    fixture.detectChanges();
    const courseElement: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item')[0];
    expect(courseElement.classList.contains('course-item__top-rated')).toBeTruthy();
    const star: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item__top-rated-icon')[0];
    expect(star).toBeTruthy();
  });

  it('should raise deleteing course event on delete button click', () => {
    spyOn(console, 'log');
    const deleteButton: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item__button')[1];
    deleteButton.click();
    expect(console.log).toHaveBeenCalledWith('Deleting course: 0');
  });

  it('should raise editing course event on edit button click', () => {
    spyOn(console, 'log');
    const editButton: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item__button')[0];
    editButton.click();
    expect(console.log).toHaveBeenCalledWith('Editing course: 0');
  });

  it('should raise viewing course event on course element click', () => {
    spyOn(console, 'log');
    const courseElement: HTMLElement = fixture.nativeElement.querySelectorAll('.course-item')[0];
    courseElement.click();
    expect(console.log).toHaveBeenCalledWith('Viewing course: 0');
  });
});
