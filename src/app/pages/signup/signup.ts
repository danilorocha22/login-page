import { Component, inject } from '@angular/core';
import { DefaultLogin } from '../../components/default-login/default-login';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from '../../components/primary-input/primary-input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-signup',
  imports: [DefaultLogin, ReactiveFormsModule, PrimaryInput],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private readonly router: Router = inject(Router);
  private readonly loginService: LoginService = inject(LoginService);
  private readonly toastService = inject(ToastrService);

  protected signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    this.loginService
      .signup(
        this.signupForm.value.name ?? '',
        this.signupForm.value.email ?? '',
        this.signupForm.value.password ?? ''
      )
      .subscribe({
        next: () => this.toastService.success('Login feito com sucesso!'),
        error: () => this.toastService.error('Erro inesperado! Tente novamente mais tarde'),
      });
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
