import { Component, inject } from '@angular/core';
import { DefaultLogin } from "../../components/default-login/default-login";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from "../../components/primary-input/primary-input";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

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
    if (this.loginForm.valid) {
      const user: User = {
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      }

      this.loginService.login(user).subscribe({
        next: () => {
          this.toastService.success('Login feito com sucesso!');
        },
        error: (error) => {
          this.toastService.error('Erro inesperado! Tente novamente mais tarde.');
        }
      });
    }
  }

  navigate() {
    this.router.navigate(['signup']);
  }

}
