import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseHighlight]'
})
export class CourseHighlightDirective implements OnInit {
  @Input('appCourseHighlight') creationDate: Date;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    const DAYS_OFFSET = 14;
    const MILLISECOND_IN_DAY = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const boundaryDate = new Date(currentDate.getTime() - DAYS_OFFSET * MILLISECOND_IN_DAY);

    if (this.creationDate < currentDate && this.creationDate >= boundaryDate) {
      this.el.nativeElement.style.border = '2px solid #98ffb2';
    } else if (this.creationDate > currentDate) {
      this.el.nativeElement.style.border = '2px solid #98d0ff';
    }
  }

}
