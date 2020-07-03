import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Router} from '@angular/router';
import {Department} from '../../models/Department';
import {Planning} from '../../models/Planning';
import {DepartmentService} from '../../services/department/department.service';
import {PlanningService} from '../../services/planning/planning.service';
import {AttendanceService} from '../../services/Attendance/attendance.service';
import {Attendance} from '../../models/Attendance';
import {User} from '../../models/User';
import {UserService} from '../../services/user/user.service';
import {HoveredUserService} from '../../services/hoveredUser/hovered-user.service';
import {Absence} from '../../models/Absence';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-50%)', opacity: 0}),
          animate(500, style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-400%)', opacity: 0}),
          animate(500, style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'enterThirdAnimation', [
        transition(':enter', [   // :enter is alias to 'void => *'
          style({opacity: 0}),
          animate(500, style({opacity: 1}))
        ]),
        transition(':leave', [   // :leave is alias to '* => void'
          animate(500, style({opacity: 0}))
        ])
      ]
    )
  ]
})
export class AbsencesComponent implements OnInit {
  showPoint: boolean;
  showAbsences: boolean;
  time = new Date();
  departments: Department[] = [];
  plannings: Planning[] = [];
  users: User[] = [];
  selectedFilter: string;
  showHideInput: boolean;
  showHideInput2: boolean;
  searchText;
  searchText2;
  userCheckIns: Attendance[];
  userCheckOuts: Attendance[];
  loading: boolean;
  days: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATRUDAY'];
  clickedUser: User;
  currentDay: string;
  loadingUser: boolean;
  constructor(
    public dialog: MatDialog,
    private hoveredUserService: HoveredUserService,
    private userService: UserService,
    private attendanceService: AttendanceService,
    private departmentService: DepartmentService,
    private planningService: PlanningService,
    public router: Router, private themeChanger: ThemeChangerService) {
    this.selectedFilter = 'employees';
    this.currentDay = this.days[this.time.getDay()];
  }

  ngOnInit(): void {
    this.loading = true;
    this.reloadData();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.showAbsences = false;
    this.showPoint = true;
  }
  //
  // const date = new Date(att.attendanceDate.toString());
  // console.log(date.toDateString());
  reloadData() {
    this.userService.list().subscribe(r => {
      for (const emp of r) {
        if ( emp.department.planning.scheduleDays.indexOf(this.currentDay) > -1 ) {
          for (const att of emp.attendances) {
            let date: Date;
            date = new Date(att.attendanceDate);
            if (date.toDateString() !== this.time.toDateString()) {
              emp.attendances.splice(emp.attendances.indexOf(att), 1);
            }
          }
          this.users.push(emp);
       }
      }
      this.planningService.list().subscribe(r1 => {
        for (const pl of r1) {
          if (pl.scheduleDays.indexOf(this.days[this.time.getDay()]) > -1) {
            this.plannings.push(pl);
          }
        }
        this.departmentService.list().subscribe(r2 => {
          for (const dep of r2) {
            if (dep.planning.scheduleDays.indexOf(this.days[this.time.getDay()]) > -1) {
              this.departments.push(dep);
            }
          }
          setTimeout(() => {
            this.loading = false;
          }, 500);
          // tslint:disable-next-line:no-shadowed-variable
        }, error => {
          console.log(error);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
        // tslint:disable-next-line:no-shadowed-variable
      }, error => {
        console.log(error);
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    }, error => {
      console.log(error);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    });
  }

  showHide(x: number) {
    if (x === 1) {
      this.showAbsences = true;
      this.showPoint = false;
    } else {
      this.showAbsences = false;
      this.showPoint = true;
    }
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  getAttByDep(dep: Department) {
    const attToReturn: User[] = [];
    for (const emp of this.users) {
      if (emp.department.depId === dep.depId) {
        attToReturn.push(emp);
      }
    }
    return attToReturn;
  }

  getAttByPl(pl: Planning) {
    const attToReturn: User[] = [];
    for (const emp of this.users) {
      if (emp.department.planning.planningId === pl.planningId) {
        attToReturn.push(emp);
      }
    }
    return attToReturn;
  }

  setFilter(filter: string) {
    if (filter === 'employees') {
      this.hoveredUserService.setPlusTop(0);
    } else {
      this.hoveredUserService.setPlusTop(135);
    }
    if (filter !== this.selectedFilter) {
    this.selectedFilter = '';
    setTimeout(() => {
      this.selectedFilter = filter;
    }, 400 );
    }
  }

  setEmployee(emp: User) {
    this.loadingUser = true;
    this.clickedUser = emp;
    this.userCheckOuts = [];
    this.userCheckIns = [];
    for (const att of emp.attendances) {
      if (att.attendanceType === 'CHECK OUT') {
        this.userCheckOuts.push(att);
      } else {
        this.userCheckIns.push(att);
      }
    }
    setTimeout(() => {
      this.loadingUser = false;
    }, 600);
  }
  getTime(hour: number, sender) {
    const h = Math.floor(hour / 60);
    const m = hour % 60;
    let returnTime: string;
    returnTime = '';
    if (h < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + h.toString();
    if (sender === 2) {
      returnTime = returnTime + 'h';
    }
    returnTime = returnTime + ':';
    if (m < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + m.toString();
    if (sender === 2) {
      returnTime = returnTime + 'mn';
    }
    return returnTime;
  }

  getMessage(reasonStatus: string) {
    if (reasonStatus === 'btn btn-warning') {
      return 'Not verified yet';
    } else if (reasonStatus === 'btn btn-success') {
      return 'Accepted';
    } else {
      return 'Rejected !';
    }
  }

  openAbsenceVerificationSheet(abs: Absence) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        height: '380',
        data: [status, 'updateAbsence']
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        }
      });
    }
}
