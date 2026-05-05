import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <div class="login-card">
        <button class="close-btn" (click)="goHome()">✕</button>
        <h2>Admin Login</h2>
        <p class="subtitle">Portfolio Management</p>
        <form (ngSubmit)="login()">
          <div class="field">
            <label>Email</label>
            <input type="email" [(ngModel)]="email" name="email" placeholder="admin@portfolio.com" required />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="••••••••" required />
          </div>
          <p class="error" *ngIf="errorVisible">⚠️ {{ error }}</p>
          <button type="submit" [disabled]="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; }
    .login-card { background: #0d1117; border: 1px solid #1e293b; border-radius: 12px; padding: 2.5rem; width: 100%; max-width: 400px; position: relative; }
    .close-btn { position: absolute; top: 0.75rem; right: 0.75rem; background: none; border: none; color: #64748b; font-size: 1rem; cursor: pointer; padding: 0.25rem; line-height: 1; transition: color 0.2s; width: auto; }
    .close-btn:hover { color: #e2e8f0; }
    h2 { color: #00d4ff; margin: 0 0 0.25rem; font-size: 1.5rem; }
    .subtitle { color: #64748b; margin: 0 0 2rem; font-size: 0.9rem; }
    .field { margin-bottom: 1.25rem; }
    label { display: block; color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.4rem; }
    input { width: 100%; padding: 0.75rem 1rem; background: #0a0a0a; border: 1px solid #1e293b; border-radius: 8px; color: #fff; font-size: 0.95rem; box-sizing: border-box; }
    input:focus { outline: none; border-color: #00d4ff; }
    button { width: 100%; padding: 0.85rem; background: linear-gradient(135deg, #00d4ff, #0099ff); color: #000; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; margin-top: 0.5rem; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
    .error { color: #f87171; font-size: 0.85rem; margin: 0.5rem 0; background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.25); border-radius: 6px; padding: 0.6rem 0.9rem; animation: shake 0.3s ease; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25%       { transform: translateX(-6px); }
      75%       { transform: translateX(6px); }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  errorVisible = false;
  loading = false;

  constructor(private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {}

  goHome() { this.router.navigate(['/']); }

  login() {
    this.loading = true;
    this.errorVisible = false;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/admin/dashboard']); },
      error: () => { this.loading = false; this.error = 'Invalid email or password'; this.errorVisible = true; this.cdr.detectChanges(); }
    });
  }
}
