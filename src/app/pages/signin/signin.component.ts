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

@Component({
  selector: 'app-signin',
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
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
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
        console.log(data);
        this.router.navigate(['/inicio']).then(() => {
          console.log('Register OK, loading login...');
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
