import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {newArray} from '@angular/compiler/src/util';
import {Department} from '../../models/Department';
import {User} from '../../models/User';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  clickedDep: Department;
  thisIsEmp: boolean;
  searchText;
  users: User[];
  constructor(public router: Router) { }
  ngOnInit(): void {
    this.thisIsEmp = true;
    this.users = [];
    }
  setDepartment( dep: Department) {
    this.thisIsEmp = false;
    this.users = [];
    this.clickedDep = dep;
    console.log(dep.depId);
    console.table(this.clickedDep);
    if (this.clickedDep.depId !== -1) {
      this.users = this.clickedDep.users;
    }
  }
}
