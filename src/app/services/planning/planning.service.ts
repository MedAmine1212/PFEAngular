import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Planning  } from '../../models/Planning';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private baseUrl = 'http://localhost:81/planning/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }


  add(planning: Planning) {
    return this.http.post(this.baseUrl + 'add', planning);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id );
  }

  modify( planning: Planning , id): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id   , planning);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }
}
