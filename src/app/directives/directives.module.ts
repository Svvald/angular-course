import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseHighlightDirective } from './course-highlight/course-highlight.directive';

@NgModule({
    declarations: [
        CourseHighlightDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CourseHighlightDirective
    ],
    providers: [],
})
export class DirectivesModule {}
