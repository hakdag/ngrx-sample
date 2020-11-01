import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.action';
import { User } from '../models/user';
import { UserService } from './services/user.service';

@Injectable()
export class UserEffects {
  constructor(private http: HttpClient, private action$: Actions, private userService: UserService) {}

  private ApiURL: string = 'https://jsonplaceholder.typicode.com/users';

  GetUsers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.BeginGetUserAction),
      mergeMap(action =>
        this.userService.getAll().pipe(
          map((data: User[]) => {
            return UserActions.SuccessGetUserAction({ payload: data });
          }),
          catchError((error: Error) => {
            return of(UserActions.ErrorUserAction(error));
          })
        )
      )
    )
  );

  SelectUsers$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(UserActions.BeginSelectUserAction),
      mergeMap(action =>
        of(UserActions.SuccessSelectUserAction({ payload: action.payload }))
      )
    )
  );
}