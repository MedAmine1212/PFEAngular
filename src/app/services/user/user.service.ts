import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/User';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl = environment.ipAddress + environment.port + '/user/';
  private headers: HttpHeaders;
   sender: User;

  constructor(private http: HttpClient) {
    // @ts-ignore
    this.findUserWithToken().subscribe(user => this.sender = user);
  }


  public findUserWithToken() {
    this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.get(this.baseurl + 'auth', {headers: this.headers});
  }

  add(user: User) {
    return this.http.post(this.baseurl + 'add', user);
  }

  list(): Observable<any> {
    return this.http.get(this.baseurl + 'list');
  }

  remove(id) {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    console.log(this.sender.userId);
    return this.http.delete(this.baseurl + 'delete/' + id + '/' + this.sender.userId);
  }

  modify(id, user, sender) {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put(this.baseurl + 'update/' + id + '/' + sender, user);
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
    return this.http.post(this.baseurl + 'changePassword/' + user.cin, changePassword, {headers: this.headers});
  }

  getFirstTime() {
    return this.http.get(this.baseurl + 'firstTime');
  }
  changeRole(id, role) {
    return this.http.get(this.baseurl + 'makeRevokeAdmin/' + id + '/' + role);
  }
}

