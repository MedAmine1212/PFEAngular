import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../models/Department';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = environment.ipAddress + environment.port + '/department/';
  constructor(private http: HttpClient) { }

  add(department: Department) {
    return this.http.post(this.baseUrl + 'add', department);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id );
  }

  modify(departmentId: number, department: Department): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + departmentId, department);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }

  getChefDep(depId): Observable<any> {
    return this.http.get(this.baseUrl + 'getChefDep/' + depId);
  }
  getSupDep(depId): Observable<any> {
    return this.http.get(this.baseUrl + 'getSupDep/' + depId);
  }
}
