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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule,
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
  addFailed = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _storageService: StorageService,
    private _snackBar: MatSnackBar
  ) {
    this.user = this._storageService.getUser().id;
    this.getFriendsList();
  }

  ngOnInit(): void {
    this.searchUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
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
          this.addFailed = false;
          this._snackBar.open(`User ${us} added!`, 'Ok');
        }
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.addFailed = true;
        this._snackBar.open(this.errorMessage, 'Ok');
      },
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

  deleteFriend(id: any) {
    this._userService.deleteFriend(id, this.user).subscribe({
      next: (data) => {
        let index = this.friendList.findIndex((x) => x.id == id);
        if (index > -1) {
          this.friendList.splice(index, 1);
        }
        this._snackBar.open('Friend was deleted', 'Ok');
      },
      error: (error) => {},
    });
  }
}
