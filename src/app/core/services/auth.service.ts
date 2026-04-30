import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'admin_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ access_token: string }>('http://localhost:3000/api/auth/login', { email, password }).pipe(
      tap(res => localStorage.setItem(this.tokenKey, res.access_token))
    );
  }

  logout() { localStorage.removeItem(this.tokenKey); }

  getToken(): string | null { return localStorage.getItem(this.tokenKey); }

  isLoggedIn(): boolean { return !!this.getToken(); }
}
