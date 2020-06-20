import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/User';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department/department.service';
import {Address} from '../../models/Address';
import {UserService} from '../../services/user/user.service';
import {AddressService} from '../../services/address/address.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
  private themeChanger: ThemeChangerService,
  private departmentService: DepartmentService, private  userService: UserService,
  private addressService: AddressService) {}
  static refreshEmp: boolean;
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
    this.userService.modify(this.emp.userId, this.newEmp).subscribe( next => {
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
}
