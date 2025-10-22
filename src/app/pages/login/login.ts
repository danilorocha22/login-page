import { Component, inject } from '@angular/core';
import { DefaultLogin } from '../../components/default-login/default-login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';
import { ToastrService } from 'ngx-toastr';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  imports: [DefaultLogin, ReactiveFormsModule, PrimaryInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router: Router = inject(Router);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly toastService = inject(ToastrService);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    this.loginService
      .login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '')
      .subscribe({
        next: () => this.toastService.success('Login feito com sucesso!'),
        error: () => this.toastService.error('Erro inesperado! Tente novamente mais tarde'),
      });
  }

  navigate() {
    this.router.navigate(['signup']);
  }
}
