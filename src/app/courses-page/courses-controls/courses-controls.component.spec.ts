import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesControlsComponent } from './courses-controls.component';
import { FormsModule } from '@angular/forms';

describe('CoursesControlsComponent', () => {
  let component: CoursesControlsComponent;
  let fixture: ComponentFixture<CoursesControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesControlsComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise event handler on button click', () => {
    component.searchingCourseName = 'Test';
    console.log = jasmine.createSpy('log');

    const searchButton: HTMLElement = fixture.nativeElement.querySelectorAll('button')[0];
    searchButton.click();
    expect(console.log).toHaveBeenCalledWith('Searching course: Test');
  });
});
