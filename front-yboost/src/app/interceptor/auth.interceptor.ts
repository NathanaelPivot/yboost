import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifier que l'on est en environnement client
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token'); // Exemple d'accès au localStorage
      if (token) {
        const clonedRequest = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(clonedRequest);
      }
    }
    return next.handle(req);
  }
}
