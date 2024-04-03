import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/main-view/navbar/navbar.component';
import { FooterComponent } from '../../components/main-view/footer/footer.component';
import { FeaturesComponent } from '../../components/main-view/features/features.component';
import { OpinionsComponent } from '../../components/main-view/opinions/opinions.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FeaturesComponent,
    OpinionsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
