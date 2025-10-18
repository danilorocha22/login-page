import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);

  login(user: User) {
    return this.http.post<LoginResponse>('/login', user).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token)
        sessionStorage.setItem('username', response.name)
      })
    );
  }
}
