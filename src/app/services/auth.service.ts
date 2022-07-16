import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  register(payload: any) {
    return this.http.post(`${environment.url}/auth/signup`, payload);
  }
  
  login(payload: any) {
    return this.http.post(`${environment.url}/auth/signin`, payload);
  }

  loggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
