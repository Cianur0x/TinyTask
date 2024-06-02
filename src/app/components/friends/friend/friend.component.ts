import { Component, Input } from '@angular/core';
import { IFriend } from '../../../models/friend.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss',
})
export class FriendComponent {
  @Input() friend!: IFriend;
  faUser = faCircleUser;
}
