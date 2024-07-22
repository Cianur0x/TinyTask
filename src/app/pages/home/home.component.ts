import { Component } from '@angular/core';
import { MainViewModule } from '../../components/main-view/main-view.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainViewModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
