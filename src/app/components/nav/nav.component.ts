import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {RemoteMonitoringComponent} from '../remote-monitoring/remote-monitoring.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {User} from "../../models/User";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn;
  user: User  = new User();
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.loggedIn() ;
    this.userService.findUserWithToken().subscribe(res => { // @ts-ignore
      // @ts-ignore
      this.user = res ; });
    console.log(this.user);
  }

  logout() {
  this.auth.loggedOut();
    this.ngOnInit();
  this.router.navigateByUrl('');
  }
}
