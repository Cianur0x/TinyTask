import { Component, inject, Input } from '@angular/core';
import { IFriendRequest } from '../../../models/request.models';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { FriendRequestService } from '../../../services/friendRequest/friend-request.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})
export class RequestComponent {
  @Input() request!: IFriendRequest;

  durationInSeconds = 5;
  constructor(
    private _snackBar: MatSnackBar,
    private _requestService: FriendRequestService
  ) {}

  openSnackBar(i: number) {
    const str = i == 0 ? 'accepted' : 'declined';
    this._snackBar.open(`Request has been ${str}`, 'Ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  addFriend(idRequest: IFriendRequest, arg: number) {
    const str = arg == 0 ? 'ACCEPTED' : 'DECLINED';
    idRequest.status = str;
    this._requestService.updateRequest(idRequest).subscribe({
      next: (data) => {
        if (data != null) {
          console.log(data);
        }
      },
      error: (error) => {
        console.log('ola error');
      },
    });
  }
}