import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentPageComponent } from './no-content-page.component';

xdescribe('NoContentPageComponent', () => {
  let component: NoContentPageComponent;
  let fixture: ComponentFixture<NoContentPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
