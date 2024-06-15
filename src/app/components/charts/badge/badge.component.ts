import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IBadge } from '../../../models/badge.models';
import { BadgeService } from '../../../services/badge/badge.service';
import { StorageService } from '../../../services/storage/storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  currentUser = this._storageService.getUser();
  userBadge!: IBadge;
  imagePath: string = '';
  isImageLoading = false;
  constructor(
    private _badgeService: BadgeService,
    private _storageService: StorageService
  ) {
    this.getBadge();
  }

  getBadge() {
    this.isImageLoading = true;
    this._badgeService.getUser(this.currentUser.id).subscribe({
      next: (data) => {
        this.userBadge = data as IBadge;
        this.imagePath = this.chooseImageBadge(this.userBadge.id);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
      },
    });
  }

  chooseImageBadge(id: number) {
    return `assets/imgs/badges/badge${id}.png`;
  }
}
