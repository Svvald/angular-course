import { Action } from '@ngrx/store';

import { Course } from '../../entities/course.model';

export const CoursesActionType = {
    GET_COURSES: '[Courses] Get courses',
    GET_COURSES_SUCCESS: '[Courses] Get courses success',
    GET_COURSES_FAIL: '[Courses] Get courses failed'
}

export class GetCourses implements Action {
    readonly type = CoursesActionType.GET_COURSES;
    constructor(public payload: number) { }
}

export class GetCoursesSuccess implements Action {
    readonly type = CoursesActionType.GET_COURSES_SUCCESS;
    constructor(public payload: Course[]) { }
}

export class GetCoursesFailed implements Action {
    readonly type = CoursesActionType.GET_COURSES_FAIL;
    constructor(public payload: Error) { }
}
