import { HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // ✅ MUST have "Bearer "
      }
    });
  }

  return next(req);
};
