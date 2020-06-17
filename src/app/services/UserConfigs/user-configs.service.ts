import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/User';
import {UserConfigs} from '../../models/UserConfigs';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserConfigsService {

  private baseurl = environment.ipAddress + environment.port + '/userConfigs/';

  constructor(private http: HttpClient) {
  }
  findByUserId(id): Observable<User> {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    return this.http.get(this.baseurl + 'findByUserId/' + id);
  }
  add(config: UserConfigs) {
      return this.http.post(this.baseurl + 'add', config );
    }

    update(id, config) {
      // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
      return this.http.put(this.baseurl + 'update/' + id, config);
    }
}
