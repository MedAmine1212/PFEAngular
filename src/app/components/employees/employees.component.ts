import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
import {DepartmentService} from '../../services/department/department.service';
import {DeleteDepDialogComponent} from '../../dialogs/delete-dep-dialog/delete-dep-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartmentComponent} from '../../dialogs/dialog-forms/add-department/add-department.component';
import {AddUserComponent} from '../../dialogs/dialog-forms/add-user/add-user.component';
import {UserService} from '../../services/user/user.service';
import {EmployeeDetailsComponent} from '../../dialogs/employee-details/employee-details.component';
import {DeleteUserDialogComponent} from '../../dialogs/delete-user-dialog/delete-user-dialog.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

  @Output() outPutData = new EventEmitter<any>();
  clickedDep: Department;
  thisIsEmp: boolean;
  searchText;
  showHideInput: boolean;
  chefDep: User;
  users: User[];
  usersForDep: User[];
  private deleteId: number;
  constructor(public dialog: MatDialog, public router: Router,
              private departmentService: DepartmentService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.showHideInput = false;
    this.clickedDep = null;
    this.thisIsEmp = true;
    this.users = [];
    if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)'
        || this.router.url === '/RemoteMonitoring/(mainCon:Absences)' || this.router.url === '/RemoteMonitoring') {
      this.reloadData();
    }
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
      if (result) {
        this.deleteId = this.clickedDep.depId;
        this.departmentService.remove(this.clickedDep.depId).subscribe(() => {
          this.clickedDep = new Department();
          this.clickedDep.depId = -1;
          this.outPutData.emit();
          console.log('Refreshing departments..');
        }, error1 => console.log(error1));
      }
    });
  }

  showAddDepDialog(): void {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '500px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 1]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      console.log('Refreshing departments..');
      this.outPutData.emit();
      }
    });
  }

  showUpdateDepDialog() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '800px',
      height: '615px',
      panelClass: 'matDialogClass',
      data: [this.clickedDep, 2]
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Refreshing departments..');
        this.outPutData.emit();
        console.log('Refreshing Employees..');
        this.setChefDep(this.clickedDep.depId);
      }
    });
  }

  showAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '850px',
      height: '615px',
      panelClass: 'matDialogClass',
      data: this.clickedDep
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.router.url === '/RemoteMonitoring/(mainCon:Employees)' || this.router.url === '/RemoteMonitoring/(mainCon:Absences)') {
          this.reloadData();
        } else {
          this.outPutData.emit();
          this.reloadData();
        }
      }
    });
  }

  private reloadData() {
    this.users = [];

    this.userService.list().subscribe(r => {
      if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)' && this.clickedDep.depId !== -1) {
        this.chefDep = null;
        this.setChefDep(this.clickedDep.depId);
        this.usersForDep = r;
        for (const emp of this.usersForDep) {
          if (emp.department.depId === this.clickedDep.depId) {
            this.users.push(emp);
          }
        }
        this.clickedDep.users = [];
        this.clickedDep.users = this.users;
        this.outPutData.emit();
      } else {
        this.users = r;
      }
    });
  }

  openDetailsDialog(emp: User) {
    if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
      emp.department = this.clickedDep;
    }
    const dialogRef = this.dialog.open(EmployeeDetailsComponent, {
      width: '900px',
      height: '625px',
      panelClass: 'matDialogClass',
      data: emp
    });
    dialogRef.afterClosed().subscribe(result => {
      if (EmployeeDetailsComponent.refreshEmp) {
        console.log('Refreshing employees..');
        this.reloadData();
        if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
          this.outPutData.emit();
        }
      }
    });
  }
  openDeleteEmpDialog(emp: User) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      height: '380',
      data: emp
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.userService.remove(emp.userId).subscribe(() => {
          console.log('Refreshing employees..');
          this.reloadData();
        }, error1 => console.log(error1));
      }
    });
  }
}
