import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { WeekdayComponent } from '../../components/tasks/weekday/weekday.component';
import { StorageService } from '../../services/storage/storage.service';
import { InicioAdminComponent } from '../inicio-admin/inicio-admin.component';
import { InicioUsuarioComponent } from '../inicio-usuario/inicio-usuario.component';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-inicio-general',
  standalone: true,
  imports: [
    InicioAdminComponent,
    InicioUsuarioComponent,
    MatButtonModule,
    MatIcon,
    WeekdayComponent,
    FontAwesomeModule,
  ],
  templateUrl: './inicio-general.component.html',
  styleUrl: './inicio-general.component.scss',
})
export class InicioGeneralComponent {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  isLoggedIn = false;
  roles: string[] = [];
  date = new Date();
  month: any = this.date.toLocaleString('default', { month: 'long' });
  year = this.date.getFullYear();

  constructor(private storageService: StorageService, private router: Router) {
    this.month = this.capitalizeFirstLetter(this.month);
  }

  capitalizeFirstLetter(mes: string): string {
    return mes.charAt(0).toUpperCase() + mes.slice(1);
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl('inicio').then(() => {
        console.log('Ya logueado, cargando index.');
      });
    }
  }
}
