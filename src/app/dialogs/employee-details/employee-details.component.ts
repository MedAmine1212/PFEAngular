import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../models/User';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/departement/department.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  showUpdateForm: boolean;
  showAddressUpdateForm: boolean;
  departments: Department[];
  depTemp: Department = new Department();
  i: number;

  constructor(
  public dialogRef: MatDialogRef<EmployeeDetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public emp: User, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.showUpdateForm = false;
    this.showAddressUpdateForm = false;
    this.departments = [];
    this.departmentService.list().subscribe(r => {
      this.departments = r;
      this.i = 0;
      this.depTemp = this.departments[0];
      for (const dep of this.departments) {
        if (dep.depId === this.emp.department.depId) {
          this.departments[this.i] = this.depTemp;
          break;
        }
        this.i++;
      }
      this.departments[0] = this.emp.department;
    });
  }

  saveAddresses() {

  }

  saveUser() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
