import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFriend } from '../../../models/friend.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [FontAwesomeModule, MatButtonModule, MatIconModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss',
})
export class FriendComponent {
  @Input() friend!: IFriend;
  @Output() friendDelete: EventEmitter<any> = new EventEmitter();
  faUser = faCircleUser;

  deleteFriend(id: number) {
    this.friendDelete.emit(id);
  }
}
