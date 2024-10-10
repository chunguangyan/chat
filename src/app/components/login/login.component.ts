import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <form (ngSubmit)="onSubmit()" class="login-form">
        <h2>Login</h2>
        <div class="form-group">
          <label for="email">Email</label>
          <input [(ngModel)]="email" name="email" type="email" id="email" placeholder="please enter email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input [(ngModel)]="password" name="password" type="password" id="password" placeholder="please enter password" required>
        </div>
        <button type="submit" [disabled]="isLoading">
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
        <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f2f5;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 350px;
    }
    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #1890ff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #40a9ff;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .error-message {
      color: #ff4d4f;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Login attempt with:', { email: this.email, password: this.password });
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          this.isLoading = false;
          this.router.navigate(['/chat']);
        },
        (error) => {
          console.error('Login failed', error);
          this.isLoading = false;
          this.errorMessage = 'Login failed, please check your credentials and try again.';
        }
      );
  }
}
