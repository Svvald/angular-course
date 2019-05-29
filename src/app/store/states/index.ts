import { IAuthState } from '../reducers/auth.reducer';
import { ICoursesState } from '../reducers/courses.reducer';

export interface IAppState {
    auth: IAuthState;
    courses: ICoursesState;
}
