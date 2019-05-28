import { ElementRef } from '@angular/core';

import { CourseHighlightDirective } from './course-highlight.directive';

xdescribe('CourseHighlightDirective', () => {
  it('should create an instance', () => {
    const el: ElementRef = new ElementRef({});
    const directive = new CourseHighlightDirective(el);
    expect(directive).toBeTruthy();
  });
});
