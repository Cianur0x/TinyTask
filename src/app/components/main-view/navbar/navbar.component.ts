import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIf, NgOptimizedImage } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn = false;

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
}
