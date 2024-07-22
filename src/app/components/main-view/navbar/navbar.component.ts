import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PruebaService } from '../../../services/prueba/prueba.service';
import { StorageService } from '../../../services/storage/storage.service';
import { GeneralNavbarComponent } from '../general-navbar/general-navbar.component';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgOptimizedImage,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    FontAwesomeModule,
    MatIconModule,
    MatBadgeModule,
    NavbarAdminComponent,
    NavbarUserComponent,
    GeneralNavbarComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin!: boolean;
  switchProfile = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    public route: ActivatedRoute,
    public pruebaService: PruebaService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.storageService.isAdmin();
    }
  }

  logout() {
    this.storageService.clean();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.router.navigate(['/login']);
  }

  changeProfile() {
    if (this.storageService.isAdmin()) {
      this.switchProfile = !this.switchProfile;
    }
  }
}
