import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
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
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FriendComponent } from '../../components/friends/friend/friend.component';
import { TreeNestedOverviewExample } from '../../components/friends/tree-tasks/tree-tasks.component';
import { IFriend } from '../../models/friend.models';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
import { FriendRequestService } from '../../services/friendRequest/friend-request.service';
import { IFriendRequest } from '../../models/request.models';
import { RequestComponent } from '../../components/friends/request/request.component';

export interface FriendsTasks {
  nameOwner: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  owner: string;
  title: string;
  taskDone: boolean;
  description: string;
  deadLine: string;
}

interface Message {
  message: string;
}

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
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    TreeNestedOverviewExample,
    NgClass,
    RequestComponent,
  ],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
})
export class FriendsListComponent {
  hideRequiredControl = new FormControl('');
  searchUserForm!: FormGroup;
  show = false;
  user: any;
  friendList: IFriend[] = [];
  userAdded: boolean = false;
  addFailed = false;
  errorMessage = '';
  taskdata: FriendsTasks[] = [];

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _requestService: FriendRequestService,
    private _storageService: StorageService,
    private _snackBar: MatSnackBar
  ) {
    this.user = this._storageService.getUser();

    this.clearTags();
  }

  ngOnInit(): void {
    this.searchUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
    });
    this.getFriendsList();
    this.getRequestList();
  }

  open() {
    this.show = !this.show;
  }

  onSubmit(): void {
    let username: string = this.searchUserForm.value.username;
    const friend = username.trim();
    const request: IFriendRequest = {
      id: 0,
      senderId: this.user.id,
      sender: this.user.username,
      receiver: friend,
      status: 'PENDING',
    };
    this._requestService.sendFriendRequest(request).subscribe({
      next: (data) => {
        if (data != null) {
          const value = data as Message;
          this.errorMessage = value.message;
          this._snackBar.open(this.errorMessage, 'Ok');
          this.errorMessage = '';
        }
      },
      error: (error) => {
        console.log('ola error');
        this.errorMessage = error.error.message;
        this.addFailed = true;
        this._snackBar.open(this.errorMessage, 'Ok');
        this.errorMessage = '';
      },
    });
  }

  getFriendsList() {
    this._userService.getFriendsList(this.user.id).subscribe({
      next: (data) => {
        this.friendList = data as IFriend[];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  requestList: IFriendRequest[] = [];
  getRequestList() {
    this._requestService.getFriendRequestRecibidas(this.user.id).subscribe({
      next: (data) => {
        this.requestList = data as IFriendRequest[];
        console.log('request', data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteFriend(id: any) {
    this._userService.deleteFriend(id, this.user.id).subscribe({
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

  isSmallScreen: boolean = false;
  change: boolean = true;
  clearTags() {
    this._breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
      .subscribe((result) => {
        if (result.matches) {
          this.isSmallScreen = true;
        }
      });
  }

  openTagsNav() {
    this.isSmallScreen = !this.isSmallScreen;
  }

  changeSide(side: number) {
    this.change = this.show = side == 0;
  }
}
