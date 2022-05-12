import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): any{
    // this.authService.loggedIn();
    const pass = true;
    if (pass) {
      return true;
    } else {
      this.router.navigate(['/acceder']);
    }
  }
}
