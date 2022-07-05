import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) { }

  getMovements() {
    return this.http.get(`${environment.url}/movimiento`);
  }
  createMovement(payload: any) {
    return this.http.post(`${environment.url}/movimiento`, payload);
  }

  deleteMovement(id: string, payload: any) {
    return this.http.post(`${environment.url}/movimiento/${id}`, payload);
  }
}
