import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {User} from '../../models/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TempUserService {
  private baseurl = environment.ipAddress + environment.port + '/tempUser/';

  constructor(private http: HttpClient) { }

  add(user: User, sender) {
    return this.http.post(this.baseurl + 'add/' + sender, user);
  }

  acceptRequest(user, action) {
    return this.http.post(this.baseurl + 'acceptRequest/' + action , user);
  }

  declineRequest(id) {
    return this.http.delete(this.baseurl + 'declineRequest/' + id);
  }

  findById(id): Observable<User> {
    // @ts-ignore
    return this.http.get(this.baseurl + 'findById/' + id);
  }
}
