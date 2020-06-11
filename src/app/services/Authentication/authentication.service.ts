import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Login} from '../../models/Login';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {
  url = 'http://localhost:81/';
  jwt: string ;
  email: string;
  roles: Array<string> ;
  constructor(private http: HttpClient) { }

  authenticate(login: Login, isRemembered: boolean) {
    return this.http.post(this.url + 'auth/login/' + isRemembered, login);
  }

  getToken() {
    return   localStorage.getItem('token');
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt) ;
    this.jwt = jwt ;
    this.parseJWT();
  }

  private parseJWT() {
    const jwtHelper = new JwtHelperService() ;
    const jwtObject = jwtHelper.decodeToken(this.jwt);
    // this.email = jwtObject.obj;
    // this.roles = jwtObject.roles ;
  }
  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }

  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }

  isAuthentified() {
    return this.roles && (this.isAdmin() || this.isUser());
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  loggedOut(): void {
    localStorage.removeItem('token');
    localStorage.cin = '';
  }


}
