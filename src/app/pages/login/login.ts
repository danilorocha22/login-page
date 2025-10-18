import { Component } from '@angular/core';
import { DefaultLogin } from "../../components/default-login/default-login";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInput } from "../../components/primary-input/primary-input";

@Component({
  selector: 'app-login',
  imports: [DefaultLogin, ReactiveFormsModule, PrimaryInput],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });


}

