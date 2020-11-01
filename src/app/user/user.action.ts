import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const GetUserAction = createAction('[User] - Get User');
export const BeginGetUserAction = createAction('[User] - Begin Get User');
export const SuccessGetUserAction = createAction(
  '[User] - Success Get User',
  props<{ payload: User[] }>()
);

export const SelectUserAction = createAction(
  '[User] - Select User',
  props<User>()
);
export const BeginSelectUserAction = createAction(
  '[User] - Begin Select User',
  props<{ payload: User }>()
);
export const SuccessSelectUserAction = createAction(
  '[User] - Success Select User',
  props<{ payload: User }>()
);

export const ErrorUserAction = createAction('[User] - Error', props<Error>());
