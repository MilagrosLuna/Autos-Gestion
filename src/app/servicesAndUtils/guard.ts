import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { auth } from 'src/main';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  // Espera a que Firebase resuelva la sesión y exige que el login haya pasado
  // la verificación de cuenta aprobada ('logueado' se guarda recién ahí).
  async canActivate(): Promise<boolean | UrlTree> {
    await auth.authStateReady();
    const user = auth.currentUser;

    if (user && localStorage.getItem('logueado') === user.uid) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
