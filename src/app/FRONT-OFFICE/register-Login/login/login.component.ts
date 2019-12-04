import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entities/user';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.user = new User() ;
  }

  login() {
    return this.auth.login(this.user).subscribe(r => {
      const jwt = r.headers.get('Authorization');
      this.auth.saveToken(jwt) ;
      console.log(this.auth.isUser());
      console.log( this.auth.isAdmin());
      console.log( this.auth.isAuthentified());
    }, error => {});
  }

}
