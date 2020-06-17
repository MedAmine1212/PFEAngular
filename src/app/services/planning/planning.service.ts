import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Planning  } from '../../models/Planning';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private baseUrl = environment.ipAddress + environment.port + '/planning/';
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
