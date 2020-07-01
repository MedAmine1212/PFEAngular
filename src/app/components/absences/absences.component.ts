import { Component, OnInit } from '@angular/core';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {Router} from '@angular/router';
import {Department} from '../../models/Department';
import {Planning} from '../../models/Planning';
import {DepartmentService} from '../../services/department/department.service';
import {PlanningService} from '../../services/planning/planning.service';
import {AttendanceService} from '../../services/Attendance/attendance.service';
import {Attendance} from '../../models/Attendance';
@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-50%)', opacity: 0}),
          animate('0.3s', style({transform: 'translateX(0)', opacity: 1}))
        ])
      ]
    ),
    trigger(
      'enterSecondAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-400%)', opacity: 0}),
          animate('0.3s', style({transform: 'translateX(0)', opacity: 1}))
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
  showMotifs: boolean;
  showPoint: boolean;
  showAbsences: boolean;
  time = new Date();
  departments: Department[] = [];
  plannings: Planning[] = [];
  selectedFilter: string;
  showHideInput: boolean;
  showHideInput2: boolean;
  searchText;
  searchText2;
  attendances: Attendance[] = [];
  loading: boolean;
  todaysAttendances: Attendance[] = [];
  days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  constructor(
    private attendanceService: AttendanceService,
    private departmentService: DepartmentService,
    private planningService: PlanningService,
    public router: Router, private themeChanger: ThemeChangerService) {
    this.selectedFilter = 'employees';
  }

  ngOnInit(): void {
    this.loading = true;
    this.reloadData();
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.showMotifs = false;
    this.showAbsences = false;
    this.showPoint = true;
  }

  reloadData() {
    this.attendanceService.list().subscribe(r => {
      this.attendances = r;
      for (const att of r) {
        const date = new Date(att.attendanceDate.toString());
        if ( date.toDateString() === this.time.toDateString()) {
          this.todaysAttendances.push(att);
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
      this.showAbsences = false;
      this.showMotifs = true;
      this.showPoint = false;
    } else if (x === 2) {
      this.showAbsences = true;
      this.showMotifs = false;
      this.showPoint = false;
    } else {
      this.showAbsences = false;
      this.showMotifs = false;
      this.showPoint = true;
    }
  }

  getTheme() {
    return this.themeChanger.getTheme();
  }

  getAttByDep(dep: Department) {
    const attToReturn: Attendance[] = [];
    for (const att of this.todaysAttendances) {
      if (att.user.department.depId === dep.depId) {
        attToReturn.push(att);
      }
    }
    return attToReturn;
  }

  getAttByPl(pl: Planning) {
    console.log('ey ne5dem');
    const attToReturn: Attendance[] = [];
    for (const att of this.todaysAttendances) {
      if (att.user.department.planning.planningId === pl.planningId) {
        attToReturn.push(att);
      }
    }
    return attToReturn;
  }

  setFilter(filter: string) {
    if (filter !== this.selectedFilter) {
    this.selectedFilter = '';
    setTimeout(() => {
      this.selectedFilter = filter;
    }, 400 );
    }
  }
}
