import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { IRol, IUserMan } from '../../models/user.models';
import { AdminService } from '../../services/adminServices/admin.service';
import { StorageService } from '../../services/storage/storage.service';

interface Usuario {
  email: string;
  id: number;
  lastConnection: string;
  rol: string;
  username: string;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'lastConnection',
    'rol',
    'actions',
  ];

  dataSource!: MatTableDataSource<Usuario>;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  roles: IRol[] = [
    { id: 1, roleName: 'ROL_ADMIN' },
    { id: 2, roleName: 'ROL_USER' },
  ];

  currentAdmin: any;

  constructor(
    private _adminService: AdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _storageService: StorageService
  ) {
    this.currentAdmin = this._storageService.getUser();
    this.getAllUsers();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userdata: Usuario[] = [];
  getAllUsers() {
    this.isLoadingResults = true;
    this._adminService.getAllUsers().subscribe({
      next: (data) => {
        const array = data as IUserMan[];
        this.userdata = this.modificarUsuarios(array);
        this.dataSource = new MatTableDataSource(this.userdata);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  }

  // Función para modificar un usuario
  modificarUsuarios(usuarios: IUserMan[]): Usuario[] {
    let userArr: Usuario[] = [];

    usuarios.forEach((usuario) => {
      const primerRol = usuario.rol[0].roleName;

      let user: Usuario = {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        lastConnection: usuario.lastConnection,
        rol: primerRol,
      };

      userArr.push(user);
    });
    console.log(userArr);
    return userArr;
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    id: number
  ) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.userdata = this.userdata.filter((x) => x.id != result.id);
      this.dataSource = new MatTableDataSource(this.userdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (!!result) {
        this._snackBar.open(
          `The user with id: ${result.id} has been deleted`,
          'Ok'
        );
      }
    });
  }

  updateRol(element: Usuario) {
    const user: UserRole = {
      id: element.id,
      rol: element.rol,
    };
    this._adminService.updateRole(user).subscribe({
      next: (data) => {
        if (!!data) {
          this._snackBar.open(
            `The user with id: ${element.id} has been updated to ${element.rol}`,
            'Ok'
          );
        }
      },
    });
  }
}
export interface UserRole {
  id: number;
  rol: string;
}
