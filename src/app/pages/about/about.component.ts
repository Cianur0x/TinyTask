import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/main-view/navbar/navbar.component';
import { FooterComponent } from '../../components/main-view/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
