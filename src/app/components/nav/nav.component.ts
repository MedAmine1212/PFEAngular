import { Component, OnInit } from '@angular/core';
import {RemoteMonitoringComponent} from '../remote-monitoring/remote-monitoring.component';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {User} from '../../models/User';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn;
  user: User  = new User();
  jwt = new JwtHelperService();

  constructor(
    private themeChanger: ThemeChangerService,
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService
  ) {
    this.findUser();
  }

    findUser() {
    this.userService.findUserWithToken().subscribe(res => { // @ts-ignore
      // @ts-ignore
      this.user = res ;
    });

    console.log(this.jwt.getTokenExpirationDate(localStorage.token));
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.loggedIn() ;


  }

  logout() {
  this.auth.loggedOut();
  this.ngOnInit();
  this.router.navigateByUrl('');
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  setTheme(theme: boolean) {
      this.themeChanger.setTheme(theme);

  }
}
