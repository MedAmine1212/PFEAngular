import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entities/user';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {HomeComponent} from '../../home/home.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  @Input() panParent: boolean;
  @Output() closeAll = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.user = new User() ;
  }

  login() {
    console.log('userComponent  ', this.user);
    return this.auth.login(this.user).subscribe(r => {
      const jwt = r.headers.get('Authorization');
      this.auth.saveToken(jwt) ;
      console.log(this.auth.isUser());
      console.log( this.auth.isAdmin());
      console.log( this.auth.isAuthentified());
      if (!this.panParent) {
     if (this.auth.isUser()) {this.router.navigate(['/']); }
     if (this.auth.isAdmin()) {this.router.navigate(['/admin/categories']); }} else {
      this.closeAll.emit(true);
      }
    }, error => {

    });
  }

}
