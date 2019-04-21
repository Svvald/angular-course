import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AuthService } from './auth-service/auth.service';
import { CoursesService } from './courses-service/courses.service';
import { LoaderService } from './loader-service/loader.service';
import { TokenInterceptor } from './token-interceptor/token-interceptor';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [],
    providers: [
        AuthService,
        CoursesService,
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ],
})
export class ServicesModule {}
