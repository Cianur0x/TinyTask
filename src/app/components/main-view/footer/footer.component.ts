import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDiscord,
  faSquareFacebook,
  faXTwitter,
  faInstagramSquare,
} from '@fortawesome/free-brands-svg-icons';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, MatDividerModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faDiscord = faDiscord;
  faFacebok = faSquareFacebook;
  faInsta = faInstagramSquare;
  faTw = faXTwitter;
}
