import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Attendance} from '../../models/Attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private baseUrl = environment.ipAddress + environment.port + '/att/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.delete(this.baseUrl + 'delete/' + id , {headers: this.headers });
  }

  modify( attendance: Attendance , id): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id   , attendance);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }

  findTodaysAttendancesByUser(user): Observable<any> {
    return this.http.get(this.baseUrl + 'findByUserAndDate', user);
  }
}
