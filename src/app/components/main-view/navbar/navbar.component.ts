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
  faRightFromBracket,
  faUserTie,
  faTicket,
  faNewspaper,
  faUsersGear,
  faWandMagicSparkles,
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
  faExit = faRightFromBracket;
  faUserTie = faUserTie;
  faTicket = faTicket;
  faNewspaper = faNewspaper;
  faUsersGear = faUsersGear;
  faWandMagicSparkles = faWandMagicSparkles;
  // Variables
  isMenuOpen = false;
  isLoggedIn = false;
  isAdmin!: boolean;
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
    if (this.isLoggedIn) {
      this.isAdmin = this.storageService.isAdmin();
    }
  }

  logout() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(() => {
      console.log('Logout OK, cargando login...');
    });
  }

  changeProfile() {
    if (this.storageService.isAdmin()) {
      this.switchProfile = !this.switchProfile;
    }
  }
}
