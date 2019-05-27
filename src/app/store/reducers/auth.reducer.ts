import { IUser } from 'src/app/entities/auth.model';
import { AuthActionType } from '../actions/auth.actions';

export type AuthState = IUser;

const initialState: AuthState = {
    id: 0,
    fakeToken: '',
    name: {
        first: '',
        last: '',
    },
    role: '',
};

// TODO: Figure out how to deal with Action and payload
export function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
            return action.payload;
        case AuthActionType.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}
