import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getUsers() {
    return this.http.get(`${environment.url}/usuario`);
  }

  getUser(id: string) {
    return this.http.get(`${environment.url}/usuario/${id}`);
  }

  updateUser(id: number, payload: any) {
    return this.http.put(`${environment.url}/usuario/${id}`, payload);
  }

  deleteUser(id: number, payload: any) {
    return this.http.post(`${environment.url}/usuario/${id}`, payload);
  }

}
