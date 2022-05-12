import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import User from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}
