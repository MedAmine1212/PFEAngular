import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseurl = environment.ipAddress + environment.port + '/post/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get(this.baseurl + 'list');
  }
}
