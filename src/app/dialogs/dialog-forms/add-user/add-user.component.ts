import {AfterViewInit, Component, Inject, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Department} from '../../../models/Department';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department/department.service';
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
import {DialogComponent} from '../../message-dialog/dialog.component';
import {Router} from '@angular/router';
import {UserConfigs} from '../../../models/UserConfigs';
import {PlanningService} from '../../../services/planning/planning.service';
import {ThemeChangerService} from '../../../services/ThemeChanger/theme-changer.service';
import {UserConfigsService} from '../../../services/UserConfigs/user-configs.service';
import {ImageService} from '../../../services/image/image.service';

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
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('300ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('300ms', style({opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements  OnInit  {
  dialogComponent: MatDialogRef<DialogComponent>;
  selectedFile: File;
  imageName: string;
  retrievedImage: any;
  retrieveResonse: any;
  base64Data: any;
  uploadImageData: FormData;
  subscribingUser: boolean;
  savingUser: boolean;
  allDone: boolean;
  loading: boolean;

  @ViewChild('stepper') stepper: MatStepper;
  userConfigs: UserConfigs;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  public fourthFormGroup: FormGroup;
  departments: Department[] = [];
  posts: Post[] = [];
  showOtherAddress: boolean;
  user: User = {
    cin: '',
    addresses: [],
    birthDate: '',
    department: null,
    email: '',
    firstName: '',
    gender: '',
    hireDay: null,
    name: '',
    phone: '',
    post: undefined,
    userId: null,
    userConfigs: [],
    image: '',
    notificationMessages: []
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
  imagePath: FileList;
  message: string;
  constructor(private themeChanger: ThemeChangerService,
              public dialogRef: MatDialogRef<AddUserComponent>,
              private userConfigService: UserConfigsService,
              @Inject(MAT_DIALOG_DATA) public data: Department,
              private formBuilder: FormBuilder,
              private departmentService: DepartmentService,
              private userService: UserService,
              public router: Router,
              public dialog: MatDialog,
              private addressService: AddressService,
              private postService: PostService,
              private planningService: PlanningService,
              private imageService: ImageService
  ) {
    if (this.data != null ) {
      this.user.department = this.data;
    }
    this.userConfigs = new UserConfigs();
    this.userConfigs.theme = false;
    this.userConfigs.shownPlannings =  [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.savingUser = false;
    this.subscribingUser = false;
    this.allDone = false;
    this.showOtherAddress = false;
    this.user.gender = 'male';
    this.createFirstFormGroup();
    this.createSecondFormGroup();
    this.createThirdFormGroup();
    this.createFourthFormGroup();
    this.postService.list().subscribe(posts => {
      for (const post of posts) {
        this.posts.push(post);
        this.departmentService.list().subscribe(r => {
          this.departments = r;
          for (const depp of this.departments) {
            if (depp === this.user.department) {
            }
          }
          if (this.user.department !== null) {
            setTimeout(() => {
              this.stepper.selectedIndex = 1;
            }, 900);
          }
          this.loading = false;
        });
      }
    });
  }
  createFirstFormGroup() {
    this.firstFormGroup = this.formBuilder.group({
      department: ['', [Validators.required]]
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
      // gender: [this.user.gender, [Validators.required]],
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
  createFourthFormGroup() {
    this.fourthFormGroup = this.formBuilder.group({
      streetName2: [this.address2.streetName, Validators.required],
      streetNumber2: [this.address2.streetNumber, Validators.required],
      state2: [this.address2.state, Validators.required],
      zipCode2: [this.address2.zipCode, Validators.required],
      gov2: [this.address2.governorate, Validators.required]
    });
  }
  showFourthFormGroup() {
    this.showOtherAddress = true;
    this.fourthFormGroup = null;
    this.fourthFormGroup = this.formBuilder.group({
      streetName2: [this.address2.streetName],
      streetNumber2: [this.address2.streetNumber],
      state2: [this.address2.state],
      zipCode2: [this.address2.zipCode],
      gov2: [this.address2.governorate]
    });
  }
  hideFourthFormGroup() {
    this.showOtherAddress = false;
    this.fourthFormGroup = null;
    this.createFourthFormGroup();
  }
  closeThis() {
    this.dialogRef.close(false);
  }

  addUser() {
    this.subscribingUser = true;
    this.savingUser = true;
    // set user
    this.user.post = this.secondFormGroup.controls.post.value;
    this.user.addresses.push(this.address1);
    this.user.userConfigs.push(this.userConfigs);
    if (this.showOtherAddress) {
      this.user.addresses.push(this.address2);
    }

    // set shown plannings
    this.planningService.list().subscribe( r => {
      for (const pl of r) {
        this.userConfigs.shownPlannings.push(pl.planningId);
      }
    }, error => console.log(error));

    // add user
    this.userService.add(this.user).subscribe(user => {

      setTimeout(() => {
        this.savingUser = false;
        if (this.selectedFile !== undefined) {
          // @ts-ignore
          this.upload(user.userId);
        } else {
          setTimeout(() => {
            this.userAddedSuccessfully();
          }, 400);
        }
      }, 200);
    }, error1 => console.log('erreur user add ' + error1));
  }

  upload(id) {
    setTimeout(() => {
      this.allDone = true;
    }, 400);
    this.uploadImageData = new FormData();
    this.uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.imageName = this.selectedFile.name;
    this.imageService.uploadImage(this.uploadImageData, id)
      .subscribe((response) => {
          if (response.status !== 200) {
            console.log('Image uploaded error');
          } else {
            setTimeout(() => {
              this.allDone = false;
              setTimeout(() => {
              this.userAddedSuccessfully();
              }, 400);
            }, 1500);

          }
        }
        , error => console.log(error)
      );
  }

  userAddedSuccessfully() {
    this.dialogComponent = this.dialog.open(DialogComponent, {
      width: '400px',
      data : 'User added successfully ! '
    });
    this.dialogComponent.afterClosed().subscribe(() =>
      this.dialogRef.close(true)
    );
  }

  // CHECK IN USE
  checkInUseEmail(control) {
    const emails = [];
    this.userService.list().subscribe(users => {
      for (const user of users) {
        // @ts-ignore
        emails.push(user.email);
      }
    });
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
    this.userService.list().subscribe(users => {
      for (const user of users) {
        // @ts-ignore
        cins.push(user.cin);
      }
    });
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
    this.userService.list().subscribe(users => {
      for (const user of users) {
        // @ts-ignore
        // console.log(user.name);
        phoneNumbers.push(user.phone);
      }
    });
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
  // getErrorGender() {
  //   return 'Field is required' ;
  // }
  getErrorFirstName() {
    return this.firstName.hasError('required') ?
      'Field is required' :
      this.firstName.hasError('minlength') ? 'You need to specify at least 3 characters' : 'First name should contain only characters';
  }
  getErrorName() {
    return this.name.hasError('required') ?
      'Field is required' :
      this.name.hasError('minlength') ? 'You need to specify at least 3 characters' : 'Last name should contain only characters';
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
    return this.cin.hasError('required') ? 'Field is required' :
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

  get department() {
    return this.firstFormGroup.get('department') as FormControl;
  }
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
  // get gender() {
  //   return this.secondFormGroup.get('gender') as FormControl;
  // }
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

  get streetName2() {
    return this.fourthFormGroup.get('streetName2') as FormControl;
  }
  get streetNumber2() {
    return this.fourthFormGroup.get('streetNumber2') as FormControl;
  }
  get state2() {
    return this.fourthFormGroup.get('state2') as FormControl;
  }
  get zipCode2() {
    return this.fourthFormGroup.get('zipCode2') as FormControl;
  }
  get gov2() {
    return this.fourthFormGroup.get('gov2') as FormControl;
  }
  test() {
    const controls = this.secondFormGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
      }
    }
  }

  onDateSelect(event) {
    const year = event.year;
    const month = event.month <= 9 ? '0' + event.month : event.month;
    const day = event.day <= 9 ? '0' + event.day : event.day;
    const finalDate = year + '-' + month + '-' + day;
    this.user.birthDate = finalDate;
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }





  onSelectFile(files: FileList) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    } else {
      this.selectedFile = files[0] as File;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.retrievedImage = reader.result;
    };
  }
}
