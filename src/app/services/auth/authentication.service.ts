import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../entities/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from "../user/user.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {
  url = 'http://localhost:81';
  jwt: string;
  email: string;
  roles: Array<string>;
user: User;
  private id: Observable<any>;
  constructor(private http: HttpClient, private userService: UserService) {
  }

  login(u: User) {
    return this.http.post(this.url + '/login', u, {observe: 'response'});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  private parseJWT() {
    const jwtHelper = new JwtHelperService();
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    this.email = jwtObject.obj;
    this.roles = jwtObject.roles;
  }

  isAdmin() {
    this.jwt = localStorage.getItem('token')
    this.parseJWT();
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    this.jwt = localStorage.getItem('token')
    this.parseJWT();
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentified() {
    this.jwt = localStorage.getItem('token')
    this.parseJWT();
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedOut() {
    localStorage.removeItem('token');
    this.email = '';
    this.roles = [];
  }

  getUser(): Observable<any> {
    this.jwt = localStorage.getItem('token')
    this.parseJWT();
    return this.userService.findByEmail(this.email);
  }

}
