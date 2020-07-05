import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
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
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AbsenceVerificationComponent} from '../../sheets/absence-verification/absence-verification.component';
import {DateFormatter} from 'ngx-bootstrap';
import {AbsenceService} from '../../services/absence/absence.service';
import {GetRoleService} from '../../services/getRole/get-role.service';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {UpdateAbsenceComponent} from '../../dialogs/dialog-forms/update-absence/update-absence.component';
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
  @ViewChild('empAtt') empAttDiv: HTMLDivElement;
  role: string;
  connectedUser: User;
  format = new DateFormatter();
  date = new Date();
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
  days: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  clickedUser: User;
  currentDay: string;
  loadingUser: boolean;
  absenceThisMonth: number;
  absenceThisWeek: number;
  totalAbsence: number;
  absenceThisMonthDesc: string;
  absenceThisWeekDesc: string;
  totalAbsenceDesc: string;
  monthClass: string;
  weekClass: string;
  constructor(
    public dialog: MatDialog,
    private  roleService: GetRoleService,
    private absenceService: AbsenceService,
    private bottomSheet: MatBottomSheet,
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
    this.getRole();
    this.loading = true;
    this.getConnectedUser();
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
        if (emp.department.planning != null ) {
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
      }
      this.planningService.list().subscribe(r1 => {
        for (const pl of r1) {
          if (pl.scheduleDays.indexOf(this.days[this.time.getDay()]) > -1) {
            this.plannings.push(pl);
          }
        }
        this.departmentService.list().subscribe(r2 => {
          for (const dep of r2) {
            if (dep.planning != null) {
            if (dep.planning.scheduleDays.indexOf(this.days[this.time.getDay()]) > -1) {
              this.departments.push(dep);
            }
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
    if (emp != null) {
    emp.absences = [];
    const today = new Date();
    this.totalAbsence = 0;
    this.absenceThisMonth = 0;
    this.absenceThisWeek = 0;
    this.absenceService.listByUser(emp).subscribe(r => {
      for (const ab of r) {
        emp.absences.push(ab);
        this.totalAbsence = this.totalAbsence + ab.absentMinutes;
        const date = new Date(ab.absenceDate);
        // tslint:disable-next-line:triple-equals
        if (date.getMonth() == today.getMonth()) {
          this.absenceThisMonth = this.absenceThisMonth + ab.absentMinutes;
        }
        if (today.getDay() - 6 <= date.getDay() || date.getDay() <= today.getDay() + 6) {
          this.absenceThisWeek = this.absenceThisWeek + ab.absentMinutes;
        }
      }

      this.clickedUser = emp;
      this.absenceThisMonthDesc = this.getTime(this.absenceThisMonth, 2);
      if (this.clickedUser.department.planning != null) {
      let workTime = this.clickedUser.department.planning.schedule.endHour - this.clickedUser.department.planning.schedule.startHour;
      if (this.clickedUser.department.planning.schedule.pauseTime) {
        workTime = workTime - (this.clickedUser.department.planning.schedule.pauseEnd
          - this.clickedUser.department.planning.schedule.pauseStart);
      }
      this.weekClass = this.getClass(this.absenceThisMonth, 'week', workTime);
      this.monthClass = this.getClass(this.absenceThisMonth, 'month', workTime);
      this.absenceThisWeekDesc = this.getTime(this.absenceThisWeek, 2);
      this.totalAbsenceDesc = this.getTime(this.totalAbsence, 2);
      }
      this.clickedUser.absences.reverse();
      this.userCheckOuts = [];
      this.userCheckIns = [];
      for (const att of emp.attendances) {
        if (att.attendanceType === 'CHECK OUT') {
          this.userCheckOuts.push(att);
        } else {
          this.userCheckIns.push(att);
        }
      }
      // scroll to Absences div
      let acceleration = 1;
      const interval = setInterval(() => {
        // @ts-ignore

        if (window.scrollY < (this.empAttDiv.nativeElement.offsetTop - 100)) {
          window.scroll(1, window.scrollY + ((window.innerHeight / 5) * acceleration) );
          acceleration = acceleration + 0.1;
        } else {
          clearInterval(interval);
          // @ts-ignore
          window.scroll(1, this.empAttDiv.nativeElement.offsetTop - 26);
      }
    }, 1);
      setTimeout(() => {
        this.loadingUser = false;
      }, 600);
    }, error => {
      console.log(error);
      setTimeout(() => {
        this.loadingUser = false;
    }, 600);
    });
    } else {
      this.clickedUser = null;
      setTimeout(() => {
        this.loadingUser = false;
      }, 300);
    }
  }

  getClass(time, format, workTime) {
    let total: number;
    if (format === 'week') {
      total = workTime * this.connectedUser.department.planning.scheduleDays.length;
    }
    if (format === 'month') {
      total = workTime * this.connectedUser.department.planning.scheduleDays.length * 4;
    }
    if (total * 0.05 >= time) {
      return 'btn-success';
    } else if (total * 0.05 < time && total * 0.15 >= time) {
      return 'btn-warning';
    } else {
      return 'btn-danger';
    }
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
    abs.user = this.clickedUser;
    this.bottomSheet.open(AbsenceVerificationComponent , {
      data: abs
    });
  }

  getRole() {
    this.role = this.roleService.userRole();
  }
  getConnectedUser() {
    if (this.roleService.getConnectedUser() == null) {
      setTimeout(() => {
        this.getConnectedUser();
      }, 500);
    } else {
      this.connectedUser = this.roleService.connectedUser;
      if (this.role === 'user') {
        this.clickedUser = this.connectedUser;
      }
    }
  }

  updateAbs(abs: Absence) {
    const dialogRef = this.dialog.open(UpdateAbsenceComponent, {
      width: '600px',
      height: '300px',
      data: abs
    });
  }

  getState(abs: Absence) {
    return abs.reasonStatus === 'btn btn-success' ? 'Confirmed' : abs.reasonStatus === 'btn btn-danger' ? 'Rejected' : 'Pending...';
  }
}
