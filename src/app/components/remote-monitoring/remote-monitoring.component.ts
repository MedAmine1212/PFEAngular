import {Component, OnInit, ViewChild} from '@angular/core';
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
import {PostsComponent} from '../posts/posts.component';
import {DataBaseExportImportService} from '../../services/dataBaseImportExport/data-base-export-import.service';
import {AbsencesComponent} from '../absences/absences.component';
import {HoveredUserService} from '../../services/hoveredUser/hovered-user.service';
@Component({
  selector: 'app-remmote-monitoring',
  animations: [
    trigger(
      'enterLoadingAnimation', [
        transition(':enter', [
          style({opacity: 0}),
          animate('200ms', style({opacity: 1}))
        ]),
        transition(':leave', [
          style({opacity: 1}),
          animate('0ms', style({opacity: 0}))
        ])
      ]
    ),
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
    ),
    trigger(
      'enterThirdAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)'}),
          animate('300ms', style({transform: 'translateY(0)'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)'}),
          animate('300ms', style({transform: 'translateY(100%)'}))
        ])
      ]
    )
  ],
  templateUrl: './remote-monitoring.component.html',
  styleUrls: ['./remote-monitoring.component.css']
})

export class RemoteMonitoringComponent implements OnInit {
  clickedDeparment: Department;
  private loadAPI: any;

  name: string;
  connectedUser: User;
  loading: boolean;
  clickedEmp: User;
  hoveredUser: User;
  constructor(
    private hoveredUserService: HoveredUserService,
    private dataBaseExportImportService: DataBaseExportImportService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private webSocketAPI: WebSocketAPIService,
    public router: Router, private authService: AuthenticationService, private themeChanger: ThemeChangerService) {
    this.webSocketAPI.remoteMonitoringComp.subscribe(res => {
      this.reloadFromWebSocket(res);
    });
    this.hoveredUserService.remoteMonitoringComp2.subscribe( () => {
      this.getHoveredUser();
    });
  }
  private jwt = new JwtHelperService();
  @ViewChild(EmployeesComponent) employeesComponent: EmployeesComponent;
  @ViewChild(DepartmentsComponent) departmentComponent: DepartmentsComponent;
  @ViewChild(TimetablesComponent) timetablesComponent: TimetablesComponent;
  @ViewChild(NavComponent) navComponent: NavComponent;
  @ViewChild(PostsComponent) postComponent: PostsComponent;
  @ViewChild(AbsencesComponent) absencesComponent: AbsencesComponent;
  showLoadingText: boolean;
  showSite: boolean;
  showHoveredUser: boolean;
  topHoveredUser: string;
  leftHoveredUser: string;
  window: Window = window;

  ngOnInit() {
    this.showSite = false;
    this.userService.findUserWithToken().subscribe( ress => {
      if(ress == null){
        this.authService.loggedOut();
      }
      // @ts-ignore
      this.connectedUser = ress;
      // @ts-ignore
      this.themeChanger.setTheme(ress.userConfigs[0].theme);
      this.loading = true;
      setTimeout (() => {
        this.showLoadingText = true;
      }, 200);
      localStorage.cin = this.connectedUser.cin;
      setTimeout( () => {
        this.connect();
      });
      setTimeout( () => {
      this.loading = false;
      this.showLoadingText = false;
      this.showSite = true;
      this.reloadJs();
      }, 1500);
      if (this.jwt.isTokenExpired(localStorage.getItem('token'))) {
        this.authService.loggedOut();
        window.location.reload();
      }
    }, error => {
      this.authService.loggedOut();
    });
  }
  reloadJs() {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
  }
  public loadScript() {
    const node = document.createElement('script');
    node.src = '../../../assets/scripts/temp.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
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

public reloadFromWebSocket(message) {
    if (message != null) {
  if (this.connectedUser != null) {
    const webSocketMessage = JSON.parse(message.body).socketMessage;
    if (webSocketMessage == null) {
      console.log('ERROR MESSAGE');
    } else {
      if (webSocketMessage === 'employee') {
        this.openSnackBar('Employees updated', null);
        this.employeesComponent.reloadFromSocket();
      } else if (webSocketMessage === 'timetable') {
        if (this.router.url === '/RemoteMonitoring/(mainCon:Departments)') {
          this.openSnackBar('Department updated', null);
          // this.departmentComponent.reloadData();
        } else {
          this.openSnackBar('Time table updated', null);
          this.timetablesComponent.reloadFromSocket();
        }
      } else if (webSocketMessage === 'department') {
        this.openSnackBar('Departments updated', null);
        this.departmentComponent.reloadData();
      } else if (webSocketMessage === 'post') {
        this.openSnackBar('Posts updated', null);
        this.postComponent.reloadData();
      } else if (webSocketMessage === 'userConfig') {
         if (this.connectedUser.userId === Number.parseInt(JSON.parse(message.body).senderId, 0)) {
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
        this.navComponent.reloadNotifs();
      }
      }
    }
    }
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

    refreshConnectedUser(event) {
    if (event == null) {
      this.navComponent.reloadImage();
    } else {
      this.navComponent.connectedUser = event;
    }
    }

  getDataBaseUpdating() {
    return this.dataBaseExportImportService.getDataBaseUpdating();
  }

  setClickedUser(emp: User) {
    setTimeout (() => {
      if (this.absencesComponent != null) {
        this.clickedEmp = emp;
        this.absencesComponent.setEmployee(emp);
      }
    }, 1);
  }

  getHoveredUser() {
    this.showHoveredUser = false;
    this.hoveredUser = this.hoveredUserService.getHoveredUser();
    if (this.hoveredUser != null) {
      this.topHoveredUser = this.hoveredUserService.getTop();
      this.leftHoveredUser = this.hoveredUserService.getLeft();
      this.showHoveredUser = true;
    }
  }
}
