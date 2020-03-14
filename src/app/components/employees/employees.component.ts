import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
import {DepartmentService} from '../../services/departement/department.service';
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
  showDelDep: boolean;
  showForm: Boolean;
  constructor(public router: Router, private departmentService: DepartmentService) { }
  ngOnInit(): void {
    this.showForm = false;
    this.showAddUser = false;
    this.showAddDep = false;
    this.showDelDep = false;
    this.thisIsEmp = true;
    this.users = [];
  }

  setDepartment( dep: Department) {
    this.chefDep = null;
    this.thisIsEmp = false;
    this.users = [];
    this.clickedDep = dep;
    console.log(dep.depId);
    console.table(this.clickedDep);
    if (this.clickedDep.depId !== -1) {
      this.setChefDep(this.clickedDep.depId);
      this.users = this.clickedDep.users;
    }
  }
  setChefDep(cDepId: number) {
    this.departmentService.getChefDep(cDepId).subscribe(user => {
      this.chefDep = user;
      console.log(this.chefDep.name);
    });
  }

  addUser() {

  }

  addDepartment() {

  }

  deleteDep() {

  }

  closeForm(close: boolean) {
    if (close) {
        this.showForm = this.showAddDep = this.showAddUser = this.showDelDep = false;
    }
  }
}
