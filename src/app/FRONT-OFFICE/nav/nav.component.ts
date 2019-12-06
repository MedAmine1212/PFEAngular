import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthenticationService} from "../../services/auth/authentication.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0px',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '0.9'
      })),
      transition('initial=>final', animate('300ms')),
      transition('final=>initial', animate('300ms'))
    ]),
  ]
})
export class NavComponent implements OnInit {
  @Input() alwaysHideMinPan: boolean;
  @Input() actif: string;
  acHome: boolean;
  acLogReg: boolean;
  acCon: boolean;
  constructor(private auth: AuthenticationService) { }
  private isOnP: boolean;
  hideMinPan: boolean;


  ngOnInit() {

    if (this.alwaysHideMinPan) {
      this.acHome = false;
      this.acLogReg = false;
      this.acCon = false;
      this.hideMinPan = true;
    } else{
      if (this.actif === 'home') {
        this.acHome = true;
      } else if (this.actif === 'contact') {
        this.acCon = true;
      } else {
        this.acLogReg = true;
      }
    }
    this.alwaysHideMinPan = false;
    this.isOnP = true;
  }

  isLoggedIn() {
    return localStorage.getItem('token');
  }

  logOut(){
     this.auth.loggedOut();
     this.ngOnInit();
  }


  hideShowPan(x) {
    if (x === 1) {
      this.isOnP = false;

    } else {
      this.isOnP = true;
    }

  }
}
