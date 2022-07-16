import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventary() {
    return this.http.get(`${environment.url}/material`);
  }
  getInventaryByID(id: number) {
    return this.http.get(`${environment.url}/material/${id}`);
  }

  createMaterial(payload: any) {
    return this.http.post(`${environment.url}/material`, payload);
  }

  deleteInventory(id: string, payload: any) {
    return this.http.post(`${environment.url}/material/${id}`, payload);
  }
}
