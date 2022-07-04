
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getProviders() {
    return this.http.get(`${environment.url}/proveedor`);
  }

  getProvider(id: number) {
    return this.http.get(`${environment.url}/proveedor/${id}`);
  }
  
  createProvider(payload: any) {
    return this.http.post(`${environment.url}/proveedor`, payload);
  }

  deleteProvider(id: number, payload: any) {
    return this.http.post(`${environment.url}/proveedor/${id}`, payload);
  }
}
