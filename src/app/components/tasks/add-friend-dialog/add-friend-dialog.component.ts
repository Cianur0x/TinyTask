import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IFriend } from '../../../models/friend.models';
import { FriendComponent } from '../../friends/friend/friend.component';

export interface DialogData {
  friendList: IFriend[];
}

export interface IFriendToInvite {
  id: number;
  username: string;
  imgProgile: string;
  state: string;
  checked: boolean;
}

@Component({
  selector: 'app-add-friend-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgFor,
    FriendComponent,
    FontAwesomeModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-friend-dialog.component.html',
  styleUrl: './add-friend-dialog.component.scss',
})
export class AddFriendDialogComponent {
  friendList: IFriendToInvite[] = [];
  faAdd = faPlus;
  faUser = faCircleUser;
  constructor(
    public dialogRef: MatDialogRef<AddFriendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    data.friendList.forEach((x) => {
      let object = {
        id: x.id,
        username: x.username,
        imgProgile: x.imgProgile,
        state: x.state,
        checked: false,
      };

      this.friendList.push(object);
    });
  }

  someChecked(): boolean {
    return this.friendList.filter((t) => t.checked).length > 0;
  }

  onSubmit() {
    this.dialogRef.close({
      friendList: this.friendList,
    });
  }
}
