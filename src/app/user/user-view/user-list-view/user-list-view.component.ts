import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import UserState from '../../user.state';
import * as UserActions from '../../user.action';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'username', 'email'];
  selectedUser: User;
  userSubscription: Subscription;
  UserList: User[] = [];
  user$: Observable<UserState>;
  userError: Error = null;

  constructor(private store: Store<{ users: UserState }>) {
    this.user$ = store.pipe(select('users'));
  }

  ngOnInit(): void {
    this.userSubscription = this.user$
      .pipe(
        map(x => {
          this.UserList = x.Users;
          this.userError = x.UserError;
        })
      )
      .subscribe();
    this.store.dispatch(UserActions.BeginGetUserAction());
  }

  protected userSelected(element: User) {
    this.selectedUser = this.selectedUser === element ? null : element;
    this.store.dispatch(UserActions.BeginSelectUserAction({ payload: element }));
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
