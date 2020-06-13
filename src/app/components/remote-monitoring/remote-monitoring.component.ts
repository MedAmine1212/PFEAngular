import {Component, HostListener, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import {Department} from '../../models/Department';
import {EmployeesComponent} from '../employees/employees.component';
import {DepartmentsComponent} from '../departments/departments.component';
import {AuthenticationService} from '../../services/Authentication/authentication.service';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from '../../services/user/user.service';
import {UserConfigsService} from '../../services/UserConfigs/user-configs.service';
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




  constructor(
    private userService: UserService,
    public router: Router, private authService: AuthenticationService, private themeChanger: ThemeChangerService, private userConfigService: UserConfigsService) {
  }
  time = new Date();
  private jwt = new JwtHelperService();

  @ViewChild(EmployeesComponent) employeesComponent: EmployeesComponent;
  @ViewChild(DepartmentsComponent) departmentComponent: DepartmentsComponent;
  ngOnInit() {
    this.userService.list().subscribe(r => {
      console.log(r);
    });

    this.userService.findUserWithToken().subscribe( ress => {

      // @ts-ignore
      localStorage.cin = ress.cin;
      // @ts-ignore
      this.themeChanger.setTheme(ress.userConfigs[0].theme);
    });
    if (this.jwt.isTokenExpired(localStorage.getItem('token'))) {
      this.authService.loggedOut();
      window.location.reload();
    }
    console.log('log : ', this.authService.loggedIn());
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
