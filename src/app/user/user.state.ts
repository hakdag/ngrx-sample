import { User } from '../models/user';

export default class UserState {
  Selected: User;
  Users: Array<User>;
  UserError: Error;
}

export const initializeState = (): UserState => {
  return { Selected: null, Users: Array<User>(), UserError: null };
};
