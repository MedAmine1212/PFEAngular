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
  showAddUser: boolean;
  showAddDep: boolean;
  showForm: boolean;
  showUpdateDep: boolean;

  constructor(public dialog: MatDialog, public router: Router, private departmentService: DepartmentService) {
  }

  ngOnInit(): void {
    this.showForm = false;
    this.showUpdateDep = false;
    this.showAddUser = false;
    this.showAddDep = false;
    this.thisIsEmp = true;
    this.users = [];
  }

  setDepartment(dep: Department) {
    this.chefDep = null;
    this.thisIsEmp = false;
    this.users = [];
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

  closeForm(close: boolean) {
    if (close) {
      this.showForm = this.showAddDep = this.showAddUser = false;
    }
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
      data: this.clickedDep
    });
    dialogRef.afterClosed().subscribe(result => {
     console.log('closed');
    });
  }

    showUpdateDepDialog() {
      /*const dialogRef = this.dialog.open(AddDepartmentComponent, {
        width: '800px',
        height: '600px',
        data: this.clickedDep
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('closed');
      });*/
    }

  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '800px',
      height: '615px',
      data: this.clickedDep
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('closed');
    });
  }
}
