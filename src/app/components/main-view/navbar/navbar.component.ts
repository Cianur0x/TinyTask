import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
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

  constructor(private storageService: StorageService, private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  logout() {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then(() => {
      console.log('Logout OK, cargando login...');
    });
  }

  changeProfile() {
    this.switchProfile = true;
    console.log('ola');
  }
}
