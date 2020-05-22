import {AfterViewInit, Component, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Department} from '../../../models/Department';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/departement/department.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeleteDepDialogComponent} from '../../delete-dep-dialog/delete-dep-dialog.component';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user/user.service';
import {Observable} from 'rxjs';
import {Post} from '../../../models/Post';
import {PostService} from '../../../services/post/post.service';

@Component({
  selector: 'app-add-user',
  encapsulation: ViewEncapsulation.None,

  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('300ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
    ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements AfterViewInit, OnInit  {
  @ViewChild('stepper') stepper: MatStepper;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  departments: Department[];
   posts: Post[] = [];
  firstPanelOpenState: boolean;
  secondPanelOpenState: boolean;
  dep: Department;
  showOtherAddress: boolean;
  user: User = {
    CIN: '',
    addresses: [],
    birthDay: undefined,
    department: undefined,
    email: '',
    firstName: '',
    gender: '',
    hireDay: undefined,
    name: '',
    phone: '',
    post: undefined,
    userId: 0
  };
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private formBuilder: FormBuilder, private departmentService: DepartmentService,
              private userService: UserService,
              private postService: PostService) {
  if (this.data != null ) {
      this.dep = this.data;
  }
  }

  ngOnInit(): void {

    this.createSecondFormGroup();
    this.thirdFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.postService.list().subscribe(posts => {
      for (const post of posts) {
        this.posts.push(post);
      }
      console.table(this.posts);
    });
  }
  ngAfterViewInit(): void {
    this.showOtherAddress = false;
    this.firstPanelOpenState = true;
    this.secondPanelOpenState = false;
    this.departments = [];
    // if (this.dep == null) {
    // this.departmentService.list().subscribe(r => {
    //   this.departments = r;
    // });
    // } else {
    //   console.log(this.stepper._steps);
    //   this.stepper.selectedIndex = 1;
    // }



  }

  createSecondFormGroup() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name: RegExp = /^[a-zA-Z]*$/;
    this.secondFormGroup = this.formBuilder.group({
        firstName: [this.user.firstName, [Validators.required, Validators.pattern(name),  Validators.minLength(3)]],
        name: [this.user.name, [Validators.required, Validators.pattern(name), Validators.minLength(3)]],
        email: [this.user.email, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
        cin: [this.user.CIN, [Validators.required,  Validators.minLength(8), Validators.maxLength(8)], this.checkInUseCin.bind(this)],
        phoneNumber: [this.user.phone, [Validators.required], this.checkInUsePhoneNumber.bind(this)],
        birthDate: [this.user.birthDay, [Validators.required]],
        gender: [this.user.gender, [Validators.required]],
        post: [this.user.post, [Validators.required]]
    });
  }
  closeThis() {
    this.dialogRef.close();
  }

  addUser() {
  }

  // CHECK IN USE
  checkInUseEmail(control) {
    const emails = [];
    console.log('dkhal lil emails');
    this.userService.list().subscribe(users => {
      for (const user of users) {
        // @ts-ignore
        emails.push(user.email);
      }
    });
    console.log(emails);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (emails.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  checkInUseCin(control) {
    // mimic http database access
    const cins = [];
    console.log('dkhal lil cin');
    this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
            cins.push(user.cin);
        }
      });
    console.log(cins);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (cins.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }
  checkInUsePhoneNumber(control) {
    // mimic http database access
    const phoneNumbers = [];
    console.log('dkhal lil num');
    this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
            phoneNumbers.push(user.phoneNumber);
        }
      });
    console.log(phoneNumbers);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (phoneNumbers.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  // checkCin(input: any) {
  //   // tslint:disable-next-line:radix
  //     if (input.target.value.length > 8 || (input.data != null && isNaN(Number.parseInt(input.data)))) {
  //       input.target.value = this.cin;
  //     } else {
  //       this.cin = input.target.value;
  //     }
  //   }


  // Get form controls Errors
  getErrorGender() {
    return 'Field is required' ;
  }
  getErrorFirstName() {
    return this.firstName.hasError('required') ?
      'Field is required' :
      this.firstName.hasError('minlength') ? 'You need to specify at least 3 characters' : 'First name should be contain only caracters';
  }
  getErrorName() {
    return this.name.hasError('required') ?
      'Field is required' :
      this.name.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Last name should be contain only caracters';
  }
  getErrorPhoneNumber() {
    return this.phoneNumber.hasError('alreadyInUse') ? 'This phone number is already in use' :
      'Invalid phone number ' ;
  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'Field is required' :
      this.email.hasError('pattern') ? 'Not a valid email address' :
        this.email.hasError('alreadyInUse') ? 'This email address is already in use' : '';
  }
  getErrorCin() {
    return this.email.hasError('required') ? 'Field is required' :
      this.cin.hasError('alreadyInUse') ? 'This CIN is already in use' :
        'Invalid CIN length ' ;
  }
  getErrorPost() {
    return 'Post required ' ;
  }



  // Get the form controls
  get email() {
    return this.secondFormGroup.get('email') as FormControl;
  }
  get cin() {
    return this.secondFormGroup.get('cin') as FormControl;
  }
  get phoneNumber() {
    return this.secondFormGroup.get('phoneNumber') as FormControl;
  }
  get firstName() {
    return this.secondFormGroup.get('firstName') as FormControl;
  }
  get name() {
    return this.secondFormGroup.get('name') as FormControl;
  }
  get birthDate() {
    return this.secondFormGroup.get('birthDate') as FormControl;
  }
  get gender() {
    return this.secondFormGroup.get('gender') as FormControl;
  }
  get post() {
    return this.secondFormGroup.get('post') as FormControl;
  }

  test() {
    const controls = this.secondFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        console.log(name);
      }
    }
  }

  teste() {
    console.log(this.user.post);
  }
}
