import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesControlsComponent } from './courses-controls/courses-controls.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        CourseItemComponent,
        CoursesControlsComponent,
        FooterComponent,
        HeaderComponent,
        LoaderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        DirectivesModule,
        PipesModule,
    ],
    exports: [
        BreadcrumbsComponent,
        CourseItemComponent,
        CoursesControlsComponent,
        FooterComponent,
        HeaderComponent,
        LoaderComponent,
    ],
    providers: [],
})
export class SharedModule {}
