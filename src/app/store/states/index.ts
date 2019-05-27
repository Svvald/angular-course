import { AuthState } from '../reducers/auth.reducer';
import { ICoursesState } from '../reducers/courses.reducer';

export interface IAppState {
    auth: AuthState;
    courses: ICoursesState;
}
