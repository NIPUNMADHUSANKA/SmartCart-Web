import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { ConfirmDestructive } from '../confirm-destructive/confirm-destructive';
import { deleteProfile } from '../auth/store/auth.actions';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ConfirmDestructive],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit{

  store =inject(Store);
  userInfo$ = this.store.select(selectUserInfo);
  userId: string| null | undefined;

  ngOnInit(): void {
    this.userId = null;
  }

  readonly deletePopup = 'your profile';
  toggleDelete: boolean = false;

  deleteItem(data: boolean){
    if(data){
      this.store.dispatch(deleteProfile());
    }
    this.toggleDelete = false;
  }

  toggleDeleteProfile(user:string|undefined){
   this.userId = user;
   this.toggleDelete = true;
  }

}
