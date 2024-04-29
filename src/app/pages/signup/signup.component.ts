import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgOptimizedImage } from '@angular/common';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../../components/main-view/footer/footer.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgIf, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatDividerModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    FooterComponent,
    MatSelectModule,
    // imports forms
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    NgIf,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, password, email, rol } = this.registerForm.value;

    this.authService.register(username, password, email, rol).subscribe({
      next: (data) => {
        this.router.navigate(['/inicio']).then(() => {
          console.log('Register OK, loading login...');
          this.loginAfterSignUp(username, password);
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  loginAfterSignUp(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.clean();
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
