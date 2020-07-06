import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Absence} from '../../models/Absence';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private baseUrl = environment.ipAddress + environment.port + '/absence/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }

  add(absence: Absence) {
    return this.http.put(this.baseUrl + 'add', absence);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list');
  }
  listByUser(user: User): Observable<any> {
    return this.http.get(this.baseUrl + 'listByUser/' + user.userId);
  }
  remove(id) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.delete(this.baseUrl + 'delete/' + id , {headers: this.headers });
  }

  modify( absence: Absence , id): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id, absence);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }
}
