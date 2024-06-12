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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { IUserPut } from '../../models/user.models';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    MatDividerModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgStyle,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  isImageLoading: boolean = false;
  user = this._storageService.getUser();

  constructor(
    private _userService: UserService,
    private _storageService: StorageService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.getImageFromService();
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

  getImageFromService() {
    this.isImageLoading = true;
    const userID = this.user.id;
    this._userService.obtenerImagen(userID).subscribe({
      next: (data) => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
      },
      error: (error) => {
        this.isImageLoading = false;
        console.log(error);
      },
    });
  }

  imageToShow: any;
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

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

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  file!: File;
  onUpload() {
    console.log(this.file);
    this._userService.subirImagen(1, this.file).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  onSubmit() {
    let userID = this.user.id;
    const formValues = this.profileForm.value;
    const user: IUserPut = {
      id: userID,
      username: formValues.username,
      biography: formValues.bio,
      email: formValues.email,
      state: formValues.state,
      password: formValues.password,
    };

    this._userService.updateUser(user).subscribe({
      next: (data) => {
        console.log('dataPut', data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
