import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_URL: string = 'http://localhost:8080/auth';
  private readonly http: HttpClient = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password }).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token);
        sessionStorage.setItem('username', response.name);
      })
    );
  }

  signup(name: string, email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.API_URL}/register`, { name, email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('username', value.name);
        })
      );
  }
}
