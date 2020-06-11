import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User';
import {UserConfig} from '../../models/UserConfig';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  private baseurl = 'http://localhost:81/userConfig/';

  constructor(private http: HttpClient) {
  }
  findByUser(user): Observable<User> {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    return this.http.get(this.baseurl + 'config/' , user);
  }
  add(config: UserConfig) {
      return this.http.post(this.baseurl + 'add', config );
    }
    update(id, config) {
      // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
      return this.http.put(this.baseurl + 'update/' + id, config);
    }
}
