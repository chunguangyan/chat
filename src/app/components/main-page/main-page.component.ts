import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

interface NavItem {
  path: string;
  label: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <div class="main-container">
      <h1 class="app-title">All-in-one chat app</h1>
      <p class="app-description">Explore our rich and diverse chat experience</p>
      <div class="nav-grid">
        @for (item of navItems; track item.path) {
          <a [routerLink]="item.path" class="nav-card">
            <i class="icon" [class]="item.icon"></i>
            <h2>{{item.label}}</h2>
            <p>{{item.description}}</p>
          </a>
        }
      </div>
    </div>
  `,
  styles: `
    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    .app-title {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    .app-description {
      font-size: 1.2rem;
      color: #34495e;
      margin-bottom: 2rem;
    }
    .nav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 1200px;
    }
    .nav-card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      text-decoration: none;
      color: #2c3e50;
      transition: all 0.3s ease;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .nav-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
    .icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .nav-card h2 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .nav-card p {
      font-size: 0.9rem;
      color: #7f8c8d;
    }
  `
})
export class MainPageComponent {
  navItems: NavItem[] = [
    { path: '/login', label: 'Login', description: 'Secure access to your account', icon: 'fas fa-sign-in-alt' },
    { path: '/register', label: 'Register', description: 'Join our community', icon: 'fas fa-user-plus' },
    { path: '/chat', label: 'ChatRoom', description: 'Communicate with friends in real-time', icon: 'fas fa-comments' },
    { path: '/video-chat', label: 'VideoChat', description: 'In-person virtual meetings', icon: 'fas fa-video' },
    { path: '/settings', label: 'Settings', description: 'Customize your experience', icon: 'fas fa-cog' }
  ];
}
