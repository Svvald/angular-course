import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesControlsComponent } from './courses-controls/courses-controls.component';
import { CoursesPageComponent } from './courses-page.component';
import { CourseItemComponent } from './course-item/course-item.component';

@NgModule({
  declarations: [
    CoursesControlsComponent,
    CoursesPageComponent,
    CourseItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesPageModule { }
