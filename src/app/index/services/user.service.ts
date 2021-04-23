import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public auth: AngularFireAuth, private _router: Router) {}
  // Trae la información del usuario loggeado
  getUserInfo() {
    return this.auth.user;
  }
  // Cerrar sesión
  signOut() {
    return this.auth
      .signOut()
      .then(() => {
        this._router.navigate(['login']);
        localStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
