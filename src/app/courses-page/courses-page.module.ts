import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CoursesControlsComponent } from './courses-controls/courses-controls.component';
import { CoursesPageComponent } from './courses-page.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CourseHighlightDirective } from './course-highlight/course-highlight.directive';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    CoursesControlsComponent,
    CoursesPageComponent,
    CourseItemComponent,
    CourseHighlightDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    PipesModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesPageModule { }
