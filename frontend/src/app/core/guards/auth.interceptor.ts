import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

const PROTECTED_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Only attach token for write operations (POST, PUT, DELETE)
  // All GET requests are public and need no token
  if (!PROTECTED_METHODS.includes(req.method)) {
    return next(req);
  }

  const token = inject(AuthService).getToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
