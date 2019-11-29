import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryService} from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://127.0.0.1:81/rest/products';
  constructor(private http: HttpClient) {

  }
  getProducts(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
  createProduct(product: object, idCategory: number): Observable<object> {
    return this.http.post(`${this.baseUrl}/${idCategory}`, product);
  }
  getCategoriesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categoriesList`);
  }
  deleteProduct(idProduct: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idProduct}`);
  }
  updateProduct(idProduct: number, idCategory: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${idCategory}/${idProduct}`, value);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getProductByCategorieId(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:81/rest/productsByCategory/${id}`);
  }
}
