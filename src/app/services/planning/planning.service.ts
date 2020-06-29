import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Planning  } from '../../models/Planning';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserService} from '../user/user.service';
import {NotificationMessage} from '../../models/NotificationMessage';
import {User} from '../../models/User';
import {NotificationService} from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private baseUrl = environment.ipAddress + environment.port + '/planning/';
  private headers: HttpHeaders;
  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private http: HttpClient) { }


  add(planning: Planning) {
    return this.http.post(this.baseUrl + 'add', planning);
  }

  list(): Observable<any> {
    return this.http.get(this.baseUrl + 'list' );
  }

  remove(planning, id) {
    return this.http.delete(this.baseUrl + 'delete/' + id );
  }

  modify( planning: Planning , id, sender): Observable<any> {
    return this.http.put( this.baseUrl + 'update/' + id + '/' + sender   , planning);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }
}
