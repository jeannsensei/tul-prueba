import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  /**
   * Obtiene el token de autenticacion del local storage
   */
  getToken() {
    return localStorage.getItem('token');
  }
  /**
   * Da valor al token en el local storage
   * @param value valor del token
   */
  setToken(value: string) {
    localStorage.setItem('token', value);
  }
  /**
   * Elimina el token del local storage.
   * Al acceder a la llave retornará null
   */
  removeToken() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  /**
   * Chequeo de error
   * @param err el código de error de la petición
   */
  errorHandler(err: any) {
    if (err == 401 || err == 403) {
      this.router.navigate(['/login']);
      this.removeToken();
    }
  }
}
