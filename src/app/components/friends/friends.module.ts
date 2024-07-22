import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from './friend/friend.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, FriendComponent],
  exports: [FriendComponent],
})
export class FriendsModule {}
