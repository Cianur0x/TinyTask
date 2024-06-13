import { NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../services/user/user.service';
import { IUserPut } from '../../models/user.models';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    MatDividerModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    NgStyle,
  ],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  hideRequiredControl = new FormControl('');
  currentUser!: IUserPut;
  // maxSizeInBytes: number = 4 * 1024 * 1024; // 4 MB
  profileForm!: FormGroup;
  state: Status[] = [
    { value: 'ACTIVE', viewValue: 'Active' },
    { value: 'BUSY', viewValue: 'Busy' },
    { value: 'AWAY', viewValue: 'Away' },
    { value: 'OFFLINE', viewValue: 'Offline' },
  ];

  constructor(
    private _userService: UserService,
    private _formBuilder: FormBuilder
  ) {
    this.profileForm = this._formBuilder.group({
      state: [this.state[0].value, Validators.required],
      bio: [null, [Validators.maxLength(250)]],
      username: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      profile_picture: [null],
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  file!: File;
  onUpload() {
    console.log(this.file);
    this._userService.subirImagen(3, this.file).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {}
}
