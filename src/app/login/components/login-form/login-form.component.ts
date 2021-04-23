import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginService } from './../../services/login.service';
import { FormUtilsService } from './../../../shared/services/form-utils.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginUserForm!: FormGroup;
  registerUserForm!: FormGroup;
  passwordVisible = false;
  showLoading = false;

  constructor(
    private fb: FormBuilder,
    private _formUtils: FormUtilsService,
    private _login: LoginService,
    private _message: NzMessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  // Inicialización de los formularios
  initForms() {
    this.loginUserForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.registerUserForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  // getter de formulario de inicio de sesión
  get f() {
    return this.loginUserForm.controls;
  }
  // getter de formulario de registro
  get g() {
    return this.registerUserForm.controls;
  }
  // Evento de submit en el formulario de inicio de sesión
  async submitLoginForm() {
    if (this.loginUserForm.invalid) {
      return this._formUtils.markFormGroupTouched(this.loginUserForm);
    }

    await this._login
      .loginWithMail(this.f.email.value, this.f.password.value)
      .then((data) => {
        if (data.user) {
          localStorage.setItem('uid', data.user.uid);
        }
        this._router.navigate(['home']);
        this._message.success('Has iniciado sesión exitosamente');
      })
      .catch((error) => {
        this.loginUserForm.reset();
        const message = this._login.authErrorCodes(error.code);
        this._message.error(message);
      });
  }
  // Evento de submit en el formulario de registro
  submitRegisterForm() {
    if (this.registerUserForm.invalid) {
      return this._formUtils.markFormGroupTouched(this.registerUserForm);
    }

    this._login
      .signupWithMail(this.g.email.value, this.g.password.value)
      .then((data) => {
        if (data.user) {
          localStorage.setItem('uid', data.user.uid);
        }
        this._router.navigate(['home']);
        this._message.success(
          'Te has registrado e iniciado sesión exitosamente'
        );
      })
      .catch((error: AuthError) => {
        this.registerUserForm.reset();
        const message = this._login.authErrorCodes(error.code);
        this._message.error(message);
      });
  }
}

interface AuthError {
  a: null;
  code: string;
  message: string;
}
