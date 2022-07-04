import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getHistory() {
    return this.http.get(`${environment.url}/historial`);
  }
}
