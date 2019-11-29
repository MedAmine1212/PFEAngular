import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {Observable} from 'rxjs';
import {User} from '../../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:81/rest';
  constructor(private http: HttpClient) { }

  add(user: User): Observable<object> {
    return this.http.post(this.baseUrl + '/add', user);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + '/list', );
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'Users/' + id, );
  }

  modify(user) {
    return this.http.put(this.baseUrl + 'Users/', user );
  }

  findById(id): Observable<User> {
    // @ts-ignore
    return this.http.get(this.baseUrl + 'Users/' + id);
  }

}
