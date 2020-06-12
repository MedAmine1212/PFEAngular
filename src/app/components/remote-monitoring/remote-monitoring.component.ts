import {Component, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Department} from '../../models/Department';
import {EmployeesComponent} from '../employees/employees.component';
import {DepartmentsComponent} from '../departments/departments.component';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {UserService} from "../../services/user/user.service";
@Component({
  selector: 'app-remmote-monitoring',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('0ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  templateUrl: './remote-monitoring.component.html',
  styleUrls: ['./remote-monitoring.component.css']
})

export class RemoteMonitoringComponent implements OnInit {
  clickedDeparment: Department;
  jwt = new  JwtHelperService();




  constructor(public router: Router, private authService: AuthenticationService, private themeChanger: ThemeChangerService, private userService : UserService) {
  }
  time = new Date();
  @ViewChild(EmployeesComponent) employeesComponent: EmployeesComponent;
  @ViewChild(DepartmentsComponent) departmentComponent: DepartmentsComponent;
  ngOnInit() {

    this.themeChanger.setTheme(true);
    if (this.jwt.isTokenExpired(this.authService.getToken())) {
        this.authService.loggedOut();
      }


    console.log('log : ', this.authService.loggedIn());
    this.userService.findUserWithToken().subscribe(res=> console.log(res));
    setInterval(() => {
      this.time = new Date();
    }, 1000);


  }





  setClickedDep(dep: Department) {
    setTimeout (() => {
    if (dep && this.employeesComponent != null) {
      this.clickedDeparment = dep;
      this.employeesComponent.setDepartment(dep);
    }
    }, 1);
  }

  reloadDep($event: any) {
    this.departmentComponent.reloadData();
  }


  getTheme() {
    return this.themeChanger.getTheme();
  }
}
