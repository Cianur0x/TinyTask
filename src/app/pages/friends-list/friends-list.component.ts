import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IFriend } from '../../models/friend.models';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
import { FriendComponent } from '../../components/friends/friend/friend.component';

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
    NgFor,
    FriendComponent,
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
})
export class FriendsListComponent {
  hideRequiredControl = new FormControl('');
  searchUserForm!: FormGroup;
  show = false;
  user = 0;
  friendList: IFriend[] = [];
  userAdded: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _storageService: StorageService
  ) {
    this.user = this._storageService.getUser().id;
    this.getFriendsList();
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
        if (data != null) {
          const newUser = data as IFriend;
          this.friendList.push(newUser);
          this.userAdded = true;
        }
      },
      error: (error) => {},
    });
  }

  getFriendsList() {
    this._userService.getFriendsList(this.user).subscribe({
      next: (data) => {
        this.friendList = data as IFriend[];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
