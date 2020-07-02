import { Injectable } from '@angular/core';
import {User} from '../../models/User';
import {WebSocketAPIService} from '../webSocketAPI/web-socket-api.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoveredUserService {
  private remoteMonitoringCompSource = new Subject<any>();
  remoteMonitoringComp2 = this.remoteMonitoringCompSource.asObservable();
  private plusTop: number;
  private hoveredUser: User = null;
  top: string;
  Left: string;
  constructor(private webSocketAPIService: WebSocketAPIService) {
    this.plusTop = 0;
  }

  public setHoveredUser(user: User) {
      this.hoveredUser = user;
      this.remoteMonitoringCompSource.next(user);
  }
  public getHoveredUser() {
   return this.hoveredUser;
  }
  public setTop(top) {
    this.top = top;
  }
  public getTop() {
    return this.top;
  }
  public setLeft(Left) {
    this.Left = Left;
  }
  public getLeft() {
    return this.Left;
  }
  public setPlusTop(top) {
    this.plusTop = top;
  }
  public getPlusTop() {
    return this.plusTop;
  }
}
