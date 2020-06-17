import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {UserConfigs} from "../../models/UserConfigs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseurl = environment.ipAddress + environment.port + '/notif/';

  constructor(private http: HttpClient) {
  }
  findByUserId(id): Observable<User> {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    // @ts-ignore
    return this.http.get(this.baseurl + 'findByUserId/' + id);
  }
  add(notif: Notification) {
    return this.http.post(this.baseurl + 'add', notif );
  }

  update(id, config) {
    // this.headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.token});
    return this.http.put(this.baseurl + 'update/' + id, config);
  }
}
