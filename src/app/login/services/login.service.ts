import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public auth: AngularFireAuth, private _router: Router) {}

  // Registro de usuario con correo y contraseña
  signupWithMail(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // Inicio de sesión con correo y contraseña
  loginWithMail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  /**
   *
   * @param code El string que identifica al error
   * @returns Un string con el texto dependiendo del error
   */
  authErrorCodes(code: string): string {
    switch (code) {
      case 'auth/invalid-email':
        return 'El correo ingresado es inválido';
      case 'auth/user-disabled':
        return 'El correo se encuentra desactivado';
      case 'auth/user-not-found':
        return 'El correo no fue encontrado';
      case 'auth/email-already-in-use':
        return 'El correo ya se encuentra en uso';
      case 'auth/wrong-password':
        return 'La contraseña es inválida o esta cuenta no posee contraseña';
      default:
        return 'Algo ocurrió. Contacta al soporte técnico.';
    }
  }
}
