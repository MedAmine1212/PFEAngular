import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Post} from '../../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = environment.ipAddress + environment.port + '/post/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }
  add(post: Post) {
    return this.http.post(this.baseUrl + 'add', post);
  }
  update(id: number, post: Post) {
    return this.http.put(this.baseUrl + 'update/' + id , post);
  }
  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list');
  }

  remove(id) {
  return this.http.delete(this.baseUrl + 'delete/' + id);
  }
}
