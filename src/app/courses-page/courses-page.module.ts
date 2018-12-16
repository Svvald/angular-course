import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesControlsComponent } from './courses-controls/courses-controls.component';
import { CoursesPageComponent } from './courses-page.component';

@NgModule({
  declarations: [
    CoursesControlsComponent,
    CoursesPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CoursesPageComponent
  ]
})
export class CoursesPageModule { }
