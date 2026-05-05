import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

const PROTECTED_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!PROTECTED_METHODS.includes(req.method) || req.url.includes('/auth/')) {
    return next(req);
  }

  const token = inject(AuthService).getToken();
  if (!token) {
    console.warn('No auth token found for request:', req.url);
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
