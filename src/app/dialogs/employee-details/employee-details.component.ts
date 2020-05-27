import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/User';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/departement/department.service';
import {Address} from '../../models/Address';
import {UserService} from '../../services/user/user.service';
import {AddressService} from '../../services/address/address.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  showUpdateForm: boolean;
  showAddressUpdateForm: boolean;
  departments: Department[];
  newEmp: User = new User();
  newEmpAddresses: Address [];
  selectedDep: number;

  constructor(
  public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public emp: User, private departmentService: DepartmentService, private  userService: UserService,
  private addressService: AddressService) {}

  ngOnInit(): void {
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
      this.addressService.modify(add.addressId, add);
    }
    this.showUpdateForm = false;
    this.showAddressUpdateForm = false;
  }
  saveUser() {
    for (const depp of this.departments) {
        if (depp.depId === this.selectedDep) {
          this.newEmp.department = depp;
          break;
        }
    }
    this.userService.modify(this.newEmp);
    this.showUpdateForm = false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  undoUserChanges() {
    this.duplicateUser();
    this.showUpdateForm = false;
  }

  undoAddressesChanges() {
    this.duplicateAddresses();
    this.showAddressUpdateForm = false;
  }

}
