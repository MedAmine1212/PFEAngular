import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
import {DepartmentService} from '../../services/departement/department.service';
import {DeleteDepDialogComponent} from '../../dialogs/delete-dep-dialog/delete-dep-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {UserService} from '../../services/user/user.service';
import {EmployeeDetailsComponent} from '../../dialogs/employee-details/employee-details.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  clickedDep: Department;
  thisIsEmp: boolean;
  searchText;
  chefDep: User;
  users: User[];
// tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, public router: Router, private departmentService: DepartmentService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.clickedDep = null;
    this.thisIsEmp = true;
    this.users = [];
    this.reloadData();
  }
  setDepartment(dep: Department) {
    this.users = [];
    this.chefDep = null;
    this.thisIsEmp = false;
    this.clickedDep = dep;
    if (this.clickedDep.depId !== -1) {
      this.setChefDep(this.clickedDep.depId);
      this.users = this.clickedDep.users;
    }
  }
  setChefDep(cDepId: number) {
    this.departmentService.getChefDep(cDepId).subscribe(user => {
      this.chefDep = user;
    });
  }

  showDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDepDialogComponent, {
      width: '400px',
      height: '380',
      data: {depName: this.clickedDep.depName}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.departmentService.remove(this.clickedDep.depId).subscribe();
      }
    });
  }

  showAddDepDialog(): void {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showUpdateDepDialog() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '600px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 2]
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '800px',
      height: '615px',
      panelClass: 'matDialogClass',
      data: this.clickedDep
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  private reloadData() {
    this.userService.list().subscribe(r => {
      this.users = r;
    });
  }

  openDetailsDialog(emp: User) {
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      width: '900px',
      height: '650px',
      panelClass: 'matDialogClass',
      data: emp
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
