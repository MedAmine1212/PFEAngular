import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://127.0.0.1:81/rest/orderProducts';
  constructor(private http: HttpClient) {

  }
  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  createOrder(order: object): Observable<any> {
    return this.http.post(`${this.baseUrl}`, order);
  }

  updateOrder(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getOrdersList(): Observable<any> {
    // @ts-ignore
    return this.http.get(`${this.baseUrl}`);
  }
  getOrderById(id: number): Observable<any> {
    return  this.http.get(`${this.baseUrl}/${id}`);
  }
}
