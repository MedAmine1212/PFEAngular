import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseurl = 'http://localhost:81/post/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }

  list(): Observable<any> {
    return this.http.get(this.baseurl + 'list');
  }
}
