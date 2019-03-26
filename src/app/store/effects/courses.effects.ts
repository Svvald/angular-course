import { Injectable } from "@angular/core";
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { CoursesService } from '../../services/courses-service/courses.service';
import { GetCourses, CoursesActionType, GetCoursesSuccess, GetCoursesFailed } from '../actions/courses.actions';
import { LoaderService } from '../../common/loader/service/loader.service';

@Injectable()
export class CoursesEffects {
    @Effect() getCourses$: Observable<Action> = this.actions$.pipe(
        ofType<GetCourses>(CoursesActionType.GET_COURSES),
        tap(_ => this.loaderService.toggle(true)),
        switchMap(action => this.coursesService.getCourses(action.payload).pipe(
            map(courses => new GetCoursesSuccess(courses))
        )),
        catchError(err => of(new GetCoursesFailed(err)))
    );

    @Effect({ dispatch: false }) getCoursesFailed$: Observable<Error> = this.actions$.pipe(
        ofType<GetCoursesFailed>(CoursesActionType.GET_COURSES_FAIL),
        map(action => action.payload),
        tap(err => console.error(err))
    );

    @Effect({ dispatch: false }) getCoursesSuccess$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionType.GET_COURSES_SUCCESS),
        tap(_ => this.loaderService.toggle(false))
    );

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private loaderService: LoaderService
    ) { }
}
