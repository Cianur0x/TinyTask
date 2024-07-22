import { NgClass, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
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
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/user/user.service';

interface Status {
  value: string;
  viewValue: string;
  color: string;
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
    NgClass,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  isImageLoading: boolean = false;
  user = this._storageService.getUser();
  state: Status[] = [
    { value: 'ACTIVE', viewValue: 'Active', color: '#3AE25B' },
    { value: 'BUSY', viewValue: 'Busy', color: '#FF3030' },
    { value: 'AWAY', viewValue: 'Away', color: '#FFAF26' },
    { value: 'OFFLINE', viewValue: 'Offline', color: '#9E9E9E' },
  ];
  currentColorState = this.state[0].color;
  hideRequiredControl = new FormControl('');
  currentUser!: any;
  userDataForm!: FormGroup;
  bioForm!: FormGroup;
  statusForm!: FormGroup;
  imageForm!: FormGroup;
  file!: File;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  i = Math.floor(Math.random() * 2) + 1;
  defaultImage = `assets/imgs/pfp/cat${this.i}.jpg`;
  imageToShow: any;
  message: any;
  editSuccess = false;

  constructor(
    private _userService: UserService,
    private _storageService: StorageService,
    private _formBuilder: FormBuilder
  ) {
    this.getImageFromService();
    this.getCurretUser();

    this.imageForm = this._formBuilder.group({
      profile_picture: [null],
    });
    if (!!this.currentUser) {
      this.initForms(this.currentUser);
    } else {
      this.statusForm = this._formBuilder.group({
        state: [this.state[0].value, Validators.required],
      });

      this.bioForm = this._formBuilder.group({
        bio: [null, [Validators.maxLength(250)]],
      });

      this.userDataForm = this._formBuilder.group({
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
        newPass: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(15),
          ],
        ],
      });
    }
  }

  initForms(userInfo: any) {
    this.statusForm = this._formBuilder.group({
      state: [
        this.state[this.getValueState(userInfo.state)].value,
        Validators.required,
      ],
    });

    this.bioForm = this._formBuilder.group({
      bio: [userInfo.bio, [Validators.maxLength(250)]],
    });

    this.userDataForm = this._formBuilder.group({
      username: [
        userInfo.username,
        [Validators.required, Validators.minLength(4)],
      ],
      email: [userInfo.email, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      newPass: [null, [Validators.minLength(6), Validators.maxLength(15)]],
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
        this.imageToShow = this.defaultImage;
      },
    });
  }

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

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this._userService.subirImagen(this.user.id, this.file).subscribe({
      next: (data) => {
        this.getImageFromService();
      },
      error: (error) => {},
    });
  }

  onSubmit() {
    let userID = this.user.id;
    const formValues = this.userDataForm.value;
    const user: IUserPut = {
      id: userID,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      newPass: formValues.newPass,
      bio: '',
      state: '',
    };

    this._userService.updateUser(user).subscribe({
      next: (data) => {
        this.currentUser = data;
        this.isLoginFailed = false;
        this.editSuccess = true;
        this.message = 'Data updated correctly!';
      },
      error: (error) => {
        this.message = error.error.message;
        this.isLoginFailed = true;
        this.editSuccess = false;
      },
    });
  }

  changeColorState(state: any) {
    this.currentUser.state = state;

    this._userService.updateState(this.currentUser).subscribe({
      next: (data) => {
        this.currentUser = data as IUserPut;
      },
      error: (error) => {},
    });
  }

  getValueState(state: string) {
    let value;
    switch (state) {
      case 'ONLINE':
        value = 0;
        break;
      case 'BUSY':
        value = 1;
        break;
      case 'AWAY':
        value = 2;
        break;
      case 'OFFLINE':
        value = 3;
        break;

      default:
        value = 0;
        break;
    }
    return value;
  }

  getCurretUser() {
    this._userService.getUser(this.user.id).subscribe({
      next: (data) => {
        this.currentUser = data as IUserPut;
        this.initForms(this.currentUser);
      },
      error: (error) => {},
    });
  }

  changeBio(bioForm: any) {
    let bioTrim = bioForm;

    if (bioForm.lenfth > 0) {
      bioTrim = bioForm.trim();
    }

    this.currentUser.biography = bioTrim;

    this._userService.updateBio(this.currentUser).subscribe({
      next: (data) => {
        this.currentUser = data as IUserPut;
      },
      error: (error) => {},
    });
  }

  removePhoto() {
    this._userService.deleteProfileImage(this.currentUser.id).subscribe({
      next: () => {
        this.imageToShow = this.defaultImage;
      },
      error: (err) => {},
    });
  }
}
