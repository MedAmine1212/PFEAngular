import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Schedule} from '../../models/Schedule';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = 'http://localhost:81/schedule/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  add(schedule: Schedule) {
    return this.http.post(this.baseUrl + 'add', schedule);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id );
  }

  modify( schedule: Schedule , id): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id   , schedule);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }
}
