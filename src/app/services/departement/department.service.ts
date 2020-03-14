import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../models/Department';
import {Observable} from 'rxjs';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = 'http://localhost:81/department/';
  constructor(private http: HttpClient) { }

  add(department: Department) {
    return this.http.post(this.baseUrl + 'add', department);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(departmentId: number, departement: Department): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + departmentId, Department);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }

  getChefDep(depId): Observable<any> {
    return this.http.get(this.baseUrl + 'getChefDep/' + depId);
  }
}
