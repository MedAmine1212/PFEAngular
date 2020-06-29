import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department/department.service';
import {Address} from '../../models/Address';
import {UserService} from '../../services/user/user.service';
import {AddressService} from '../../services/address/address.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {ChangePasswordComponent} from '../../dialogs/dialog-forms/change-password/change-password.component';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
  public dialog: MatDialog,
  private themeChanger: ThemeChangerService,
  private departmentService: DepartmentService, private  userService: UserService,
  private snackBar: MatSnackBar,
  private addressService: AddressService) {}


  static refreshEmp: boolean;
  @Output() outPutData = new EventEmitter<User>();
  @Input() emp: User;
  showUpdateForm: boolean;
  showAddressUpdateForm: boolean;
  departments: Department[];
  newEmp: User = new User();
  newEmpAddresses: Address [];
  selectedDep: number;
  ngOnInit(): void {
    console.log(this.emp);
    EmployeeDetailsComponent.refreshEmp = false;
    this.selectedDep = this.emp.department.depId;
    this.duplicateUser();
    this.duplicateAddresses();
    this.showUpdateForm = false;
    this.showAddressUpdateForm = false;
    this.departments = [];
    this.departmentService.list().subscribe(r => {
      this.departments = r;
    });
  }
  duplicateUser() {
    this.newEmp.userId = this.emp.userId;
    this.newEmp.name = this.emp.name;
    this.newEmp.firstName = this.emp.firstName;
    this.newEmp.cin = this.emp.cin;
    this.newEmp.birthDate = this.emp.birthDate;
    this.newEmp.department = this.emp.department;
    this.newEmp.email = this.emp.email;
    this.newEmp.post = this.emp.post;
    this.newEmp.addresses = this.emp.addresses;
    this.newEmp.hireDay = this.emp.hireDay;
    this.newEmp.gender = this.emp.gender;
    this.newEmp.phone = this.emp.phone;
  }

  private duplicateAddresses() {
    this.newEmpAddresses = [];
    for (const add of this.emp.addresses) {
      this.newEmpAddresses.push(add);
    }
  }
  saveAddresses() {
    for (const add of this.newEmpAddresses) {
      this.addressService.modify(add, add.addressId).subscribe(ad => {
        console.log('done');
        EmployeeDetailsComponent.refreshEmp = true;
        this.showAddressUpdateForm = false;
      }, error1 => {console.log(error1), this.undoAddressesChanges(); });
    }
  }
  saveUser() {
    for (const depp of this.departments) {
        if (depp.depId === this.selectedDep) {
          this.newEmp.department = depp;
          break;
        }
    }
    this.userService.modify(this.emp.userId, this.newEmp, 3).subscribe( user => {
      // @ts-ignore
      this.outPutData.emit(user);
      this.showUpdateForm = false;
      EmployeeDetailsComponent.refreshEmp = true;
    }, error1 => {console.log(error1), this.undoUserChanges(); });
  }

  undoUserChanges() {
    this.duplicateUser();
    this.showUpdateForm = false;
  }
  undoAddressesChanges() {
    this.duplicateAddresses();
    this.showAddressUpdateForm = false;
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  addSecondAddress() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: [this.newEmp, 4]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.findUserWithToken().subscribe(res => {
          this.newEmpAddresses = [];
          // @ts-ignore
          this.newEmp = res;
          // @ts-ignore
          this.emp = res;
          console.log(res);
          for (const add of this.newEmp.addresses) {
            this.newEmpAddresses.push(add);
          }
        }, error => console.log(error));
        }
      });
  }

  deleteAddress(add: Address) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      height: '380',
      data: [null, 'address']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.remove(add.addressId).subscribe(() => {
          this.newEmpAddresses.splice(this.newEmpAddresses.indexOf(add), 1);
          this.newEmp.addresses.splice(this.newEmp.addresses.indexOf(add), 1);
          this.emp = this.newEmp;
        }, error => console.log(error));
      }
    });
  }

  openChangePwDialog() {
    const dialog = this.dialog.open(ChangePasswordComponent, {
      width: '600px',
      height: '300px',
      data: this.emp
    });
    dialog.afterClosed().subscribe(result => {
      if(result){
        const config = new MatSnackBarConfig();
        if (this.themeChanger.getTheme()) {
          config.panelClass = ['snackBar'];
        } else {
          config.panelClass = ['snackBarDark'];
        }
        config.duration = 3000;
        this.snackBar.open('Password changed successfully !', null, config);
      }
    });
  }
}
