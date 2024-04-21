import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import {
  faAddressBook,
  faBell,
  faCircleUser,
  faGear,
  faListCheck,
  faTags,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../../../services/storage/storage.service';

import { MatBadgeModule } from '@angular/material/badge';
import { MessageResponse } from '../../../models/auth.models';
import { PruebaService } from '../../../services/prueba/prueba.service';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  // Icons
  faUser = faCircleUser;
  faTodo = faListCheck;
  faTags = faTags;
  faFriends = faAddressBook;
  faNoti = faBell;
  faconfig = faGear;
  faAdmin = faUserLock;
  // Variables
  isMenuOpen = false;
  isLoggedIn = false;
  isAdmin = true;
  switchProfile = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    public route: ActivatedRoute,
    public pruebaService: PruebaService
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  messageResponse!: MessageResponse;
  tipo!: string;

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  checkifAdmin() {
    // check if user ADMIN
    this.route.queryParams.subscribe((params) => {
      console.log(JSON.stringify(params)); // { tipo: "" | "solo-admin" }
      this.tipo = params['tipo'];
      console.log('Tipo prueba:' + this.tipo); // tipo

      if (this.tipo == 'solo-admin') {
        console.log('ola admin');
        this.pruebaService.pruebaSoloAdmin().subscribe((value) => {
          console.log('Respuesta pruebaSoloAdmin:' + value);
          this.messageResponse = value;
        });
      } else {
        console.log('ola random');
        this.pruebaService.prueba().subscribe((value) => {
          console.log('Respuesta prueba:' + value);
          this.messageResponse = value;
        });
      }
    });
  }

  logout() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(() => {
      console.log('Logout OK, cargando login...');
    });
  }

  changeProfile() {
    this.switchProfile = !this.switchProfile;
    this.checkifAdmin();
  }
}
