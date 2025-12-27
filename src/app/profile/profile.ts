import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserInfo } from '../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  store =inject(Store);
  userInfo$ = this.store.select(selectUserInfo);

}
