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

  remove(id) {
    return this.http.delete(this.baseUrl + '/delete/' + id, );
  }
  listUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/listUsers', );
  }
}
