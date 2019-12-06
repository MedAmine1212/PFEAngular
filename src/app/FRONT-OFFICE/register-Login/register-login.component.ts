import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})

export class RegisterLoginComponent implements OnInit {
  thisPage: string
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.thisPage = 'logReg';
  }

}
