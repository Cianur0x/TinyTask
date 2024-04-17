import { Component } from '@angular/core';
import { InicioAdminComponent } from '../inicio-admin/inicio-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { InicioUsuarioComponent } from '../inicio-usuario/inicio-usuario.component';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-inicio-general',
  standalone: true,
  imports: [
    InicioAdminComponent,
    InicioUsuarioComponent,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './inicio-general.component.html',
  styleUrl: './inicio-general.component.scss',
})
export class InicioGeneralComponent {
  isLoggedIn = false;
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

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
