import {Component, HostListener, OnInit} from '@angular/core';
import {Login} from '../../models/Login';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {UserService} from '../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {Department} from '../../models/Department';

@Component({
  selector: 'app-login',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('400ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    )
    ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  login: Login ;
  signInForm: FormGroup;
  showError: boolean;
  isRemeberChecked: boolean;
  passType: string;
  showWelcome: boolean;
  showAddUser: boolean;
  showAddDep: boolean;
  newDep: Department;
  allDone: boolean;
  firstTime: boolean;

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
    this.getFirstTime();
    this.showWelcome = true;
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

  getFirstTime() {
  this.userService.getFirstTime().subscribe(r => {
    // @ts-ignore
    this.firstTime = r;
  });
  }

  goToNext(x) {
  if (x === 1) {
    this.showWelcome = false;
    setTimeout( () => {
      this.showAddDep = true;
    }, 400);
  } else if (x === 2) {
    this.showAddDep = false;
    setTimeout( () => {
      this.showAddUser = true;
    }, 400);
  } else if (x === 3) {
    this.showAddUser = false;
    setTimeout( () => {
      this.allDone = true;
    }, 400);
  } else {
    this.showAddUser = false;
    setTimeout( () => {
      this.getFirstTime();
    }, 400);
  }
  }

  addFirstUser() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: [this.newDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goToNext(3);
      }
    });
  }

  addFirstDep() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '500px',
      panelClass: 'matDialogClass',
      data: [this.newDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result[0]) {
        if (result[1] != null) {
          this.newDep = result[1];
          this.goToNext(2);
        }
      }
    });
  }
}
