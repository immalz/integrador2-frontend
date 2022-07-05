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

  deleteInventory(id: string, payload: any) {
    return this.http.post(`${environment.url}/material/${id}`, payload);
  }
}
