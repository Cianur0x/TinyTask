import { Component, Input } from '@angular/core';
import { IFriendRequest } from '../../../models/request.models';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})
export class RequestComponent {
  @Input() request!: IFriendRequest;

  addFriend(idRequest: number, arg: number) {
    throw new Error('Method not implemented.');
  }
}
