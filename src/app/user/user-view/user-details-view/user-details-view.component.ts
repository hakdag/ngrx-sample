import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import UserState from '../../user.state';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details-view',
  templateUrl: './user-details-view.component.html',
  styleUrls: ['./user-details-view.component.scss']
})
export class UserDetailsViewComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  userSubscription: Subscription;
  user$: Observable<UserState>;

  constructor(private formBuilder: FormBuilder, private store: Store<{ users: UserState }>) {
    this.user$ = store.pipe(select('users'));
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [null],
      username: [null],
      email: [null]
    });
    this.userSubscription = this.user$
      .pipe(
        map(state => {
          const user = state.Selected;
          if (!user) {
            return;
          }
          this.userForm.get('name').setValue(user.name);
          this.userForm.get('username').setValue(user.username);
          this.userForm.get('email').setValue(user.email);
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
