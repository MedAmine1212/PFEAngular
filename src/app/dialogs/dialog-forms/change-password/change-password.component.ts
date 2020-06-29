import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePassword} from '../../../models/ChangePassword';
import {UserService} from '../../../services/user/user.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/User';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ThemeChangerService} from '../../../services/ThemeChanger/theme-changer.service';

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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
   passwordFormGroup: FormGroup;
  changePassword: ChangePassword = {newPassword: '', oldPassword: ''};
  private user: User;
    private snackBar: MatSnackBar;






  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private  themeChanger: ThemeChangerService
  ) { }

  ngOnInit(): void {
    this.createForm();
    // @ts-ignore
    this.userService.findUserWithToken().subscribe(user => this.user = user);
  }

  private createForm() {
    this.passwordFormGroup = this.formBuilder.group({
      oldpassword: [this.changePassword.oldPassword, [Validators.required]],
      newpassword: [this.changePassword.newPassword, [Validators.required, this.checkPassword]],
      repassword: [null, Validators.required],
    }, {
      validator: MustMatch('newpassword', 'repassword')
    });
  }

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { requirements: true } : null;
  }

  ChangePassword(value: any) {
    this.userService.changePassword(this.changePassword, this.data).subscribe(res => {
      console.table(res);
      if ( res === false) {
        this.oldpassword.setErrors({incorrect: true});
      } else {
        // toast
        this.dialogRef.close(true);

        // this.passwordFormGroup.reset();
        // this.oldpassword.setErrors(null);
        // this.newpassword.setErrors(null);
        // this.repassword.setErrors(null);
      }
    });
  }

  getErrorOldPassword() {
    return this.oldpassword.hasError('required') ? 'Field is required ' : 'Incorrect password';
  }
  getErrorNewPassword() {
    return this.newpassword.hasError('required') ? 'Field is required (at least six characters, one uppercase letter and one number)' :
      this.newpassword.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  getErrorRepassword() {
    return this.repassword.hasError('required') ? 'Field is required ' : 'Passwords Must match ' ;
  }

  get oldpassword() {
    return this.passwordFormGroup.get('oldpassword') as FormControl;
  }
  get newpassword() {
    return this.passwordFormGroup.get('newpassword') as FormControl;
  }
  get repassword() {
    return this.passwordFormGroup.get('repassword') as FormControl;
  }
}
