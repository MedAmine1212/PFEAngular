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
    this.pushNotif('Planning deleted', 'Your working planning has been deleted by ', planning);
    return this.http.delete(this.baseUrl + 'delete/' + id );
  }

  modify( planning: Planning , id): Observable<any> {
    this.pushNotif('Planning updated', 'Your working planning has been updated by ', planning);
    return this.http.put( this.baseUrl + 'update/' + id   , planning);
  }

  findById(id): Observable<any> {
    return this.http.get(this.baseUrl + 'findById/'  + id);
  }

  pushNotif(title, msg, planning) {
    this.userService.findUserWithToken().subscribe(r => {
      let user = new User();
      // @ts-ignore
      user = user;
      const notif = new NotificationMessage();
      notif.notifDesc = msg + user.name + ' ' + user.firstName;
      notif.notifTitle = title;
      notif.notifDate = new Date();
      notif.isViewed = false;
      notif.isHovered = false;
      // @ts-ignore
      user.notifications.push(notif);
      this.userService.modify(user.userId, user).subscribe();
      for (const dep of planning.departments) {
        for (const emp of dep.users) {
          if (emp.userId !== user.userId) {
            emp.notifications.push(notif);
            this.userService.modify(emp.userId, emp).subscribe();
          }
        }
      }
    }, error => console.log(error));
  }
}
