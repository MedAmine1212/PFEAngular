import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './Product';


@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {
  private baseUrl = 'http://127.0.0.1:81/rest/categories';

  constructor(private http: HttpClient) { }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.baseUrl}`, product);
  }
  updateProduct(id: number, value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType : 'text'});
  }
  getProductList(): Observable<any> {
    // @ts-ignore
    return this.http.get(`${this.baseUrl}`);
  }
}
