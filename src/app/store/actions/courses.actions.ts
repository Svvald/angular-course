import { Action } from '@ngrx/store';

import { Course } from '../../entities/course.model';

export const CoursesActionType = {
    GET_COURSES: '[Courses] Getting courses',
    GET_COURSES_SUCCESS: '[Courses] Getting courses succeed',
    GET_COURSES_FAIL: '[Courses] Getting courses failed',
    GET_COURSE: '[Courses] Getting course',
    GET_COURSE_SUCCESS: '[Courses] Getting course succeed',
    GET_COURSE_FAIL: '[Courses] Getting course failed',
    EDIT_COURSE: '[Courses] Editing course',
    UPDATE_COURSE: '[Courses] Updating course',
    UPDATE_COURSE_SUCCESS: '[Courses] Updating course succeed',
    UPDATE_COURSE_FAIL: '[Courses] Updating course failed'
};

export class GetCourses implements Action {
    readonly type = CoursesActionType.GET_COURSES;
    constructor(public payload: number) { }
}

export class GetCoursesSuccess implements Action {
    readonly type = CoursesActionType.GET_COURSES_SUCCESS;
    constructor(public payload: Course[]) { }
}

export class GetCoursesFail implements Action {
    readonly type = CoursesActionType.GET_COURSES_FAIL;
    constructor(public payload: Error) { }
}

export class GetCourse implements Action {
    readonly type = CoursesActionType.GET_COURSE;
    constructor(public payload: number) { }
}

export class GetCourseSuccess implements Action {
    readonly type = CoursesActionType.GET_COURSE_SUCCESS;
    constructor(public payload: Course) { }
}

export class GetCourseFail implements Action {
    readonly type = CoursesActionType.GET_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export class EditCourse implements Action {
    readonly type = CoursesActionType.EDIT_COURSE;
    constructor(public payload: number) { }
}

export class UpdateCourse implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE;
    constructor(public payload: Course) { }
}

export class UpdateCourseSuccess implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE_SUCCESS;
}

export class UpdateCourseFail implements Action {
    readonly type = CoursesActionType.UPDATE_COURSE_FAIL;
    constructor(public payload: Error) { }
}

export type CourseActionFail = GetCoursesFail | GetCourseFail | UpdateCourseFail;
