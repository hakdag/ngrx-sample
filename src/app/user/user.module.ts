import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListViewComponent } from './user-view/user-list-view/user-list-view.component';
import { UserDetailsViewComponent } from './user-view/user-details-view/user-details-view.component';
import { UserViewComponent } from './user-view/user-view.component';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from './user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user.effects';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [UserListViewComponent, UserDetailsViewComponent, UserViewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    StoreModule.forFeature('users', UserReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  providers: [UserService]
})
export class UserModule { }
