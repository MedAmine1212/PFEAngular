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
import {WebSocketAPIService} from '../../services/webSocketAPI/web-socket-api.service';
import {User} from '../../models/User';
import {TimetablesComponent} from '../timetables/timetables.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {NavComponent} from '../nav/nav.component';
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
  name: string;
  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private webSocketAPI: WebSocketAPIService,
    public router: Router, private authService: AuthenticationService, private themeChanger: ThemeChangerService) {
    this.webSocketAPI.remoteMonitoringComp.subscribe(res => {
      this.reloadFromWebSocket(res);
    });
  }

  time = new Date();
  private jwt = new JwtHelperService();
  @ViewChild(EmployeesComponent) employeesComponent: EmployeesComponent;
  @ViewChild(DepartmentsComponent) departmentComponent: DepartmentsComponent;
  @ViewChild(TimetablesComponent) timetablesComponent: TimetablesComponent;
  @ViewChild(NavComponent) navComponent: NavComponent;

  ngOnInit() {
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
    setTimeout( () => {
      this.connect();
    }, 500);
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

connect() {
  this.webSocketAPI._connect();
}

disconnect() {
  this.webSocketAPI._disconnect();
}

sendMessage() {
  this.webSocketAPI._send(this.name);
}


public reloadFromWebSocket(message) {
  this.userService.findUserWithToken().subscribe(r => {
    // @ts-ignore
    const user: User = r;
    const webSocketMessage = JSON.parse(message.body).socketMessage;
    console.log('remote monitoring: refreshing...');
    console.log('-----');
    console.log('-------------');
    console.log('---------------------');
    if (webSocketMessage == null) {
      console.log('ERROR MESSAGE');
    } else {
      if (webSocketMessage === 'employee') {
        this.openSnackBar('Employees updated', null);
        this.employeesComponent.reloadFromSocket();
      } else if (webSocketMessage === 'timetable') {
        this.openSnackBar('Time table updated', null);
        this.timetablesComponent.reloadFromSocket();
      } else if (webSocketMessage === 'department') {
        this.openSnackBar('Departments updated', null);
        this.departmentComponent.reloadData();
      } else if (webSocketMessage === 'userConfig') {
         if (user.userId === Number.parseInt(JSON.parse(message.body).senderId, 0)) {
            this.openSnackBar('Theme updated', null);
            // tslint:disable-next-line:triple-equals
            let theme: boolean;
            theme = (/true/i).test(JSON.parse(message.body).theme);
            // tslint:disable-next-line:triple-equals
            if (theme != this.themeChanger.getTheme()) {
              this.themeChanger.setTheme(!this.themeChanger.getTheme());
            }
          }
        }
      if (webSocketMessage !== 'userConfig') {
        this.navComponent.findUser();
      }
      }
    }, error => console.log(error));
}
  openSnackBar(message: string, action) {
    setTimeout(() => {
      const config = new MatSnackBarConfig();
      if (this.themeChanger.getTheme()) {
        config.panelClass = ['snackBar'];
      } else {
        config.panelClass = ['snackBarDark'];
      }
      config.duration = 3000;
      this.snackBar.open(message, action, config);

    }, 500);
    }
}
