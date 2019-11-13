import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://127.0.0.1:81/rest/categories';

  constructor(private http: HttpClient) {
  }
  getCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  createCategory(category: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, category);
  }
  updateCategory(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType : 'text'});
  }
  getCategoriesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
