import { Injectable } from '@angular/core';
import {User} from '../../Models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = 'http://localhost:81/user/';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
  }


  public findUserWithToken() {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.get(this.baseurl + 'auth', {headers: this.headers});
  }

  add(user: User) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.post(this.baseurl + 'findAll', user, {
      headers: this.headers
    });
  }

  list(): Observable<any> {
    return this.http.get(this.baseurl + 'list');
  }

  remove(id) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.delete(this.baseurl + 'users/' + id, {
      headers: this.headers
    });
  }

  modify(user) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put(this.baseurl + 'update', user, {
      headers: this.headers
    });
  }

  findById(id): Observable<User> {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    return this.http.get(this.baseurl + 'users/' + id, {
      headers: this.headers
    });
  }

  findByEmail(email): Observable<any> {
    return this.http.get(this.baseurl + 'userByEmail/' + email);
  }

  changePassword(changePassword, user) {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.post(this.baseurl + 'password/' + user.username, changePassword, {headers: this.headers});
  }
}
/*
fileUpload(file) {
  this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
  const formdata = new FormData();
  formdata.append('file', file);
  return this.http.post(this.baseUrl + 'upload', formdata, {
    headers: this.headers
  });
}
*/
