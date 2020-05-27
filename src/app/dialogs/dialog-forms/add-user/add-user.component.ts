import {AfterViewInit, Component, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Department} from '../../../models/Department';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/departement/department.service';
import {MatStepper} from '@angular/material/stepper';
import {animate, style, transition, trigger} from '@angular/animations';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../services/user/user.service';
import {Observable} from 'rxjs';
import {Post} from '../../../models/Post';
import {PostService} from '../../../services/post/post.service';
import {AddressService} from '../../../services/address/address.service';
import {Address} from '../../../models/Address';
import {User} from '../../../models/User';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {DialogComponent} from '../../dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-user',
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
  dialogComponent: MatDialogRef<DialogComponent>;
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  departments: Department[] = [];
  posts: Post[] = [];
  showOtherAddress: boolean;
  user: User = {
    cin: '',
    addresses: [],
    birthDate: undefined,
    department: null,
    email: '',
    firstName: '',
    gender: '',
    hireDay: undefined,
    name: '',
    phone: '',
    post: undefined,
    userId: null
  };
  address1: Address = {
    addressId: null,
    governorate: '',
    state: '',
    streetName: '',
    streetNumber: '',
    user: undefined,
    zipCode: null
  };
  address2: Address = {
    addressId: null,
    governorate: '',
    state: '',
    streetName: '',
    streetNumber: '',
    user: undefined,
    zipCode: null
  };
  constructor(public dialogRef: MatDialogRef<AddUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private userService: UserService,
              public router: Router,
              public dialog: MatDialog,
              private addressService: AddressService,
              private postService: PostService) {
  if (this.data != null ) {
      this.user.department = this.data;
  }
  console.log(this.user.department);






  }

  ngOnInit(): void {

    if (this.user.department !== null) {

      setTimeout(() => {
        this.stepper.selectedIndex = 1;
      }, 1000);
    }
    this.createFirstFormGroup();
    this.createSecondFormGroup();
    this.createThirdFormGroup();
    this.postService.list().subscribe(posts => {
      for (const post of posts) {
        this.posts.push(post);
      }
    });
    this.departmentService.list().subscribe(r => {
      this.departments = r;
      for (const depp of this.departments) {
        if (depp === this.user.department) {
          console.log(depp);
        }
      }
    });





  }
  ngAfterViewInit(): void {



  }

 createFirstFormGroup() {
    this.firstFormGroup = this.formBuilder.group({
      department: [this.user.department, [Validators.required]]
    });
 }
  createSecondFormGroup() {
    // tslint:disable-next-line:max-line-length
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const name: RegExp = /^[a-zA-Z]*$/;
    this.secondFormGroup = this.formBuilder.group({
        firstName: [this.user.firstName, [Validators.required, Validators.pattern(name),  Validators.minLength(3)]],
        name: [this.user.name, [Validators.required, Validators.pattern(name), Validators.minLength(3)]],
        email: [this.user.email, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail.bind(this)],
        cin: [this.user.cin, [Validators.required,  Validators.minLength(8), Validators.maxLength(8)], this.checkInUseCin.bind(this)],
        phoneNumber: [this.user.phone, [Validators.required], this.checkInUsePhoneNumber.bind(this)],
        birthDate: [this.user.birthDate, [Validators.required]],
        gender: [this.user.gender, [Validators.required]],
        post: [this.user.post, [Validators.required]]
    });
  }

  createThirdFormGroup() {
    this.thirdFormGroup = this.formBuilder.group({
      streetName: [this.address1.streetName, Validators.required],
      streetNumber: [this.address1.streetNumber, Validators.required],
      state: [this.address1.state, Validators.required],
      zipCode: [this.address1.zipCode, Validators.required],
      gov: [this.address1.governorate, Validators.required]
    });
  }
  closeThis() {
    this.dialogRef.close();
  }

  addUser() {
    this.user.post = this.secondFormGroup.controls.post.value;

    this.user.addresses.push(this.address1);
    if (this.address2.streetName !== '') {
      this.user.addresses.push(this.address2);
    }

    console.log(this.user);
    this.userService.add(this.user).subscribe(user => {
      console.log(user);
    });
    this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '400px',
      data : 'User added successfully ! '
    });
    this.dialogComponent.afterClosed().subscribe(() =>
      this.closeThis()
    );

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
      }, 1000);
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
      }, 1000);
    });
  }
  checkInUsePhoneNumber(control) {
    // mimic http database access
    const phoneNumbers = [];
    console.log('dkhal lil num');
    this.userService.list().subscribe(users => {
        for (const user of users) {
          // @ts-ignore
          // console.log(user.name);
            phoneNumbers.push(user.phone);
        }
      });
    console.log(phoneNumbers);
    return new Observable(observer => {
      setTimeout(() => {
        const result = (phoneNumbers.indexOf(control.value) !== -1) ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 1000);
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
  getErrorStreetName() {
    return 'street name required ' ;
  }
  getErrorStreetNumber() {
    return 'street number required ' ;
  }
  getErrorState() {
    return 'state required ' ;
  }
  getErrorGov() {
    return 'Governorate required ' ;
  }
  getErrorZipCode() {
    return 'Zip code required ' ;
  }
  getErrorDepartment() {
    return 'Department  required ' ;
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
  get streetName() {
    return this.thirdFormGroup.get('streetName') as FormControl;
  }
  get streetNumber() {
    return this.thirdFormGroup.get('streetNumber') as FormControl;
  }
  get state() {
    return this.thirdFormGroup.get('state') as FormControl;
  }
  get zipCode() {
    return this.thirdFormGroup.get('zipCode') as FormControl;
  }
  get gov() {
    return this.thirdFormGroup.get('gov') as FormControl;
  }
  get department() {
    return this.firstFormGroup.get('department') as FormControl;
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


  onDateSelect(event) {
    const year = event.year;
    const month = event.month <= 9 ? '0' + event.month : event.month;
    const day = event.day <= 9 ? '0' + event.day : event.day;
    const finalDate = year + '-' + month + '-' + day;
    this.user.birthDate = finalDate;
  }

  depChange(event) {
    this.firstFormGroup.controls.department.setErrors(null);
    for (const dep of this.departments) {
      if(event.target.value === dep.depName){
        this.user.department = dep;
      }
    }
    console.log(this.user.department);
  }

}
