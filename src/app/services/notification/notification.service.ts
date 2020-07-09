import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserService} from '../user/user.service';
import {NotificationMessage} from '../../models/NotificationMessage';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = environment.ipAddress + environment.port + '/notification/';
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private userService: UserService) {}
  add(notif: NotificationMessage) {
    return this.http.post(this.baseUrl + 'add', notif);
  }

  remove(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id);
  }
  modify( notif: NotificationMessage , id, sender): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id + '/' + sender   , notif);
  }
  list() {
    return this.http.get( this.baseUrl + 'list');
  }

}
