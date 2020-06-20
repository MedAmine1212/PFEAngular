import {Component, HostListener, OnInit} from '@angular/core';
import {Login} from '../../models/Login';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogComponent} from '../../dialogs/message-dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
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


  submit() {
    this.authService.authenticate(this.login, this.isRemeberChecked).subscribe(res => {
      // @ts-ignore
      localStorage.token = res.token;
      this.userService.findUserWithToken().subscribe( ress => {
      // @ts-ignore
        localStorage.cin = ress.cin;
        // @ts-ignore
        this.themeChanger.setTheme(ress.userConfigs[0].theme);
        setTimeout(() => {
          this.router.navigateByUrl('/RemoteMonitoring').then(() => window.location.reload());
        }, 100);
      }, error => console.log(error));
    }, error => {
      console.log(error);
      this.showError = true;
      });
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
}
