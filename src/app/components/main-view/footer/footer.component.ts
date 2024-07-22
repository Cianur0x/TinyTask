import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faDiscord,
  faInstagramSquare,
  faSquareFacebook,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

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
