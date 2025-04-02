import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(response => this.saveToken(response.token)), // Met à jour l'authentification après connexion
        catchError(error => {
          console.error('Erreur lors de la connexion:', error);
          return throwError(error);
        })
      );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password });
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('jwtToken', token);
      this.isAuthenticatedSubject.next(true); // Met à jour l'état après connexion
    }
  }

  getToken(): string | null {
    return typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('jwtToken') : null;
  }

  clearToken(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('jwtToken');
      this.isAuthenticatedSubject.next(false); // Met à jour l'état après déconnexion
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = this.decodeToken(token);
      return decoded.exp * 1000 > Date.now(); // Vérifie l'expiration du token
    } catch {
      return false;
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  logout(): void {
    this.clearToken();
  }

  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      throw new Error('Token invalide');
    }
  }
}
