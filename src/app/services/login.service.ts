import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/user-login';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly http: HttpClient = inject(HttpClient);

  login(user: UserLogin) {
    return this.http.post<LoginResponse>('/login', user).pipe(
      tap((response) => {
        sessionStorage.setItem('auth-token', response.token)
        sessionStorage.setItem('username', response.name)
      })
    );
  }

  signup(user: User) {
    // TODO
    return this.http.post('/signup', {});
  }
}
