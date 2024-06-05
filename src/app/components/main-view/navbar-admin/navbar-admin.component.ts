import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGear,
  faNewspaper,
  faRightFromBracket,
  faTicket,
  faUserLock,
  faUserTie,
  faUsersGear,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';
import { PruebaService } from '../../../services/prueba/prueba.service';
import { StorageService } from '../../../services/storage/storage.service';
import { MatBadgeModule } from '@angular/material/badge';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';

@Component({
  selector: 'app-navbar-admin',
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
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.scss',
})
export class NavbarAdminComponent {
  // Icons
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
  switchProfile = false;

  @Output() logOut = new EventEmitter<any>();
  @Output() switch = new EventEmitter<any>();
  @Input() isAdmin!: boolean;

  constructor(
    private _storageService: StorageService,
    private _router: Router,
    public _activatedroute: ActivatedRoute,
    public _pruebaService: PruebaService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this._storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this._storageService.isAdmin();
    }
  }

  logout() {
    this.logOut.emit();
  }

  changeProfile() {
    this.switch.emit();
  }
}
