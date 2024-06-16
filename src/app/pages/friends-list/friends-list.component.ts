import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FriendComponent } from '../../components/friends/friend/friend.component';
import { IFriend } from '../../models/friend.models';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';
import { TaskService } from '../../services/task/task.service';

interface Task {
  id: number;
  owner: string;
  title: string;
  taskDone: boolean;
  description: string;
  deadLine: string;
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
    private _snackBar: MatSnackBar,
    private _taskService: TaskService
  ) {
    this.user = this._storageService.getUser().id;
    this.getFriendsList();
    this.getAllTasksViewed();
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

  displayedColumns: string[] = [
    'id',
    'owner',
    'title',
    'taskDone',
    'description',
    'deadline',
  ];

  dataSource!: MatTableDataSource<Task>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  taskdata: Task[] = [];
  getAllTasksViewed() {
    this.isLoadingResults = true;
    this._taskService.getAllTaskViewed(this.user).subscribe({
      next: (data) => {
        console.log(data);
        this.taskdata = data as Task[];
        this.dataSource = new MatTableDataSource(this.taskdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }
}
