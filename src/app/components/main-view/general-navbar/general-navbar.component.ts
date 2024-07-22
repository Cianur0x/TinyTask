import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { MessageResponse } from '../../../models/auth.models';
import { PruebaService } from '../../../services/prueba/prueba.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    NgOptimizedImage,
    RouterModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.scss',
})
export class GeneralNavbarComponent {
  // Variables
  isMenuOpen = false;
  isLoggedIn = false;
  emailstring: string =
    'mailto:tinyTask@supp.com?subject=Support Required&body=Hello!';

  constructor(
    private _storageService: StorageService,
    private _router: Router,
    public _activatedroute: ActivatedRoute,
    public _pruebaService: PruebaService
  ) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  messageResponse!: MessageResponse;
  tipo!: string;
  ngOnInit(): void {
    this.isLoggedIn = this._storageService.isLoggedIn();
  }

  logout() {
    this._storageService.clean();
    this.isLoggedIn = false;
    this._router.navigate(['/login']).then(() => {});
  }
}
