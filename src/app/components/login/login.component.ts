import {Component, HostListener, OnInit} from '@angular/core';
import {Login} from '../../models/Login';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialogs/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  private loadAPI: any;
  login: Login ;
  signInForm: FormGroup;
  dialogComponent: MatDialogRef<DialogComponent>;
  showError: boolean;
  isRemeberChecked : boolean;




  constructor(              private authService: AuthenticationService,
                            private userService: UserService,
                            private formBuilder: FormBuilder,
                            private router: Router,
                            public dialog: MatDialog,


  ) {
  }



  ngOnInit(): void {
    this.showError = false;
    this.isRemeberChecked = false ;
    this.login = {cin: '', password: ''};
    this.createSignInForm();
  }
  reloadJs() {
    this.loadAPI = new Promise(resolve => {
      console.log('resolving promise...');
      this.loadScript();
    });
  }

  submit() {
    this.reloadJs();
    console.log('hhhhh');
    this.authService.authenticate(this.login, this.isRemeberChecked).subscribe(res => {
      // @ts-ignore
      localStorage.token = res.token;
      this.userService.findUserWithToken().subscribe( res => {
      // @ts-ignore
        localStorage.cin = res.cin;
      });
      this.router.navigateByUrl('/RemoteMonitoring').then(() => window.location.reload());
    }, error => {
      console.log(error);
      this.showError = true;
      });
  }
  public loadScript() {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = '../../../assets/scripts/temp.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      cin: [this.login.cin, [Validators.required]],
      password: [this.login.password, [Validators.required]]
    });
  }

  rememberChecked(){
    this.isRemeberChecked = !this.isRemeberChecked;
  }
}
