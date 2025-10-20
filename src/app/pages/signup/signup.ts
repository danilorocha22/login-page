import { Component, inject } from '@angular/core';
import { DefaultLogin } from "../../components/default-login/default-login";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from "../../components/primary-input/primary-input";
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';

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
    if (this.signupForm.valid) {
      const user: User = {
        id: 0,
        name: this.signupForm.value.name ?? '',
        userLogin: {
          id: 0,
          email: this.signupForm.value.email ?? '',
          password: this.signupForm.value.password ?? ''
        },
      };

      console.log('Usuário: ', user);

      this.loginService.signup(user).subscribe({
        next: () => {
          this.toastService.success('Usuário cadastrado com sucesso!');
        },
        error: (error) => {
          this.toastService.error('Erro inesperado! Tente novamente mais tarde.');
        }
      });
    }
  }

  navigate() {
    this.router.navigate(['login']);
  }

}
