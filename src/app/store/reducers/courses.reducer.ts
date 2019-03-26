import { Course } from '../../entities/course.model';
import { CoursesActionType } from '../actions/courses.actions';

export type CoursesState = {
    coursesList: Course[];
    // selectedCourse: Course;
};

const initialState: CoursesState = {
    coursesList: null,
};

export function coursesReducer(state = initialState, action: any) {
    switch (action.type) {
        case CoursesActionType.GET_COURSES_SUCCESS:
            return {
                ...state,
                coursesList: action.payload
            };
        default:
            return state;
    }
}
