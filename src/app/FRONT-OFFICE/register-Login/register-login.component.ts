import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})

export class RegisterLoginComponent implements OnInit {
  thisPage: string
  logTrue: boolean;
  signTrue: boolean;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.logTrue = true;
    this.signTrue = false;
    this.thisPage = 'logReg';
  }

  change(){
    this.logTrue = !this.logTrue;
    this.signTrue = !this.signTrue;
  }

}
