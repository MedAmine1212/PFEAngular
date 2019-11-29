import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entities/user';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatDatepickerInputEvent, MatDialog, MatDialogRef} from '@angular/material';
import {error} from 'util';
import {UserService} from '../../../services/user/user.service';
import {DialogComponent} from '../dialog.component';


type Type = 'text' | 'password' ;


// la fonction de password et confirm password
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  maxDate = new Date(2003, 0, 0);
  minDate = new Date(1920, 0, 1);
  private convertDate: string;

  public reactiveForm: FormGroup = new FormGroup({
    recaptchaReactive: new FormControl(null, Validators.required)
  });
  gender;
  dialogComponent: MatDialogRef<DialogComponent>;



  constructor(private formBuilder: FormBuilder, private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: [this.user.firstName, [Validators.required]],
      lastname: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      dateBirth: [this.user.dateOfBirth, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100)
      ]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.registerForm.controls; }


  date(e) {
    this.convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.registerForm.get('birthDate').setValue(this.convertDate, {
      onlyself: true
    });
  }

  add() {
    this.userService.add(this.user).subscribe(data => console.log(data), error1 => console.log(error1));
    this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '350px',
      data : {firstName: this.user.firstName, lastName: this.user.lastName}
    });
    this.registerForm.reset();
  }
}
