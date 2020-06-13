import {Component, HostListener, OnInit} from '@angular/core';
import {Login} from '../../models/Login';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialogs/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

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
  isRemeberChecked: boolean;
  passType: string;

constructor(
            private themeChanger: ThemeChangerService,
            private authService: AuthenticationService,
            private userService: UserService,
            private formBuilder: FormBuilder,
            private router: Router,
            public dialog: MatDialog,
  ) {
  this.passType = 'password';
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
    this.authService.authenticate(this.login, this.isRemeberChecked).subscribe(res => {
      console.log('asbaa');
      // @ts-ignore
      localStorage.token = res.token;
      this.userService.findUserWithToken().subscribe( ress => {
        console.log(ress);
      // @ts-ignore
        localStorage.cin = ress.cin;
       // @ts-ignore
        this.themeChanger.setTheme(ress.userConfigs[0].theme);

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

  rememberChecked() {
    this.isRemeberChecked = !this.isRemeberChecked;
  }

  setPassType() {
  if (this.passType === 'text') {
    this.passType = 'password';
  } else {
    this.passType = 'text';
  }
  }
}
