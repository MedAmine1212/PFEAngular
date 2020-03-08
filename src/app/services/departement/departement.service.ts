import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Department} from '../../models/Department';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  private baseUrl = 'http://localhost:81/departement/';
  private headers: HttpHeaders;
  // tslint:disable-next-line:max-line-length
  // private header = new HttpHeaders({'authorization': 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUBnbWFpbCIsInJvbGVzIjpbIlVTRVIiXSwiaXNzIjoiL2xvZ2luIiwiZXhwIjoxNTc1NDg4Nzc5fQ.k8ZKAtZUaGXefvsTgqyku_pANq_sH5rbd2NV0xQxLFM'});
  constructor(private http: HttpClient) { }

  add(department : Department) {
    return this.http.post(this.baseUrl + 'add', department);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'remove/' + id );
  }

  modify(departmentId: number, departement: Department): Observable<any> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put( this.baseUrl + 'update/' + departmentId, Department, {headers: this.headers});
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }
}
