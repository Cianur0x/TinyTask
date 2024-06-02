import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { IUser } from '../../models/auth.models';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [
    MatDivider,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatSidenavModule,
    MatIconModule,
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
})
export class FriendsListComponent {
  searchUserForm!: FormGroup;
  show = false;
  user = 0;
  friendList: IUser[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _storageService: StorageService
  ) {
    this.user = this._storageService.getUser().id;
  }

  ngOnInit(): void {
    this.searchUserForm = this.formBuilder.group({
      username: [null, Validators.required],
    });
  }

  open() {
    this.show = !this.show;
  }
  onSubmit(): void {
    let username: string = this.searchUserForm.value.username;
    const us = username.trim();

    this._userService.addFriends(us, this.user).subscribe({
      next: (data) => {
        this.friendList = data as IUser[];
        console.log(this.friendList);
      },
      error: (error) => {},
    });
  }
}
