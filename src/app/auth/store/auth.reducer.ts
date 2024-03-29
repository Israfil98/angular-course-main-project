import { User } from './../user.model';
import * as AuthActions from '../store/auth.actions';

export interface AuthState {
  user: User | null;
  authError: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  authError: null,
  isLoading: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions.AuthActionTypes
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const newUser = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: newUser,
        authError: null,
        isLoading: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.START_LOGIN:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false,
      };
    case AuthActions.CLEART_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
