import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IUserMan } from '../../models/user.models';
import { AdminService } from '../../services/adminServices/admin.service';
import { MatButtonModule } from '@angular/material/button';
interface Usuario {
  email: string;
  id: number;
  lastConnection: string;
  rol: string | undefined; // Cambiamos el tipo a string o undefined
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

  constructor(private _adminService: AdminService) {
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
        console.log(error);
      },
    });
  }

  // Función para modificar un usuario
  modificarUsuarios(usuarios: IUserMan[]): Usuario[] {
    let userArr: Usuario[] = [];
    usuarios.forEach((usuario) => {
      const primerRol =
        usuario.rol && usuario.rol.length > 0
          ? usuario.rol[0]?.roleName
          : undefined;

      let user: Usuario = {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        lastConnection: usuario.lastConnection,
        rol: primerRol,
      };

      userArr.push(user);
    });

    return userArr;
  }
}
