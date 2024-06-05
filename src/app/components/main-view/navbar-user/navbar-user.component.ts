import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ActivatedRoute,
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
  faRightFromBracket,
  faTags,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    FontAwesomeModule,
    MatIconModule,
    MatBadgeModule,
    NavbarAdminComponent,
    NavbarUserComponent,
    MatTooltipModule,
  ],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss',
})
export class NavbarUserComponent {
  // Icons
  faUser = faCircleUser;
  faTodo = faListCheck;
  faTags = faTags;
  faFriends = faAddressBook;
  faNoti = faBell;
  faconfig = faGear;
  faAdmin = faUserLock;
  faExit = faRightFromBracket;
  // Variables
  isMenuOpen = false;
  isLoggedIn = false;
  switchProfile = false;

  @Input() isAdmin!: boolean;
  @Output() logOut = new EventEmitter<any>();
  @Output() switch = new EventEmitter<any>();

  constructor(public _activatedroute: ActivatedRoute) {}

  logout() {
    this.logOut.emit();
  }

  changeProfile() {
    this.switch.emit();
  }
}
