import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User } from '../models/user';
import UserState, { initializeState } from './user.state';

export const userFeatureKey = 'users';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,

  on(UserActions.GetUserAction, state => state),
  on(UserActions.SuccessGetUserAction, (state: UserState, { payload }) => {
    return { ...state, Users: payload };
  }),

  on(UserActions.SelectUserAction, (state: UserState, User: User) => {
    return { ...state, Selected: User, UserError: null };
  }),
  on(UserActions.SuccessSelectUserAction, (state: UserState, { payload }) => {
    return { ...state, Selected: payload, UserError: null };
  }),
  
  on(UserActions.ErrorUserAction, (state: UserState, error: Error) => {
    console.log(error);
    return { ...state, UserError: error };
  })
);

export function UserReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
