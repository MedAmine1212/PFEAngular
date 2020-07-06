import {Component, Input, OnInit} from '@angular/core';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {AttendanceService} from '../../services/Attendance/attendance.service';
import {User} from '../../models/User';
import {HoveredUserService} from '../../services/hoveredUser/hovered-user.service';
import {Absence} from '../../models/Absence';
import {DateFormatter} from 'ngx-bootstrap';
import {AbsenceService} from '../../services/absence/absence.service';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  showHideInput: boolean;
  searchText;
  @Input() users: User[];
  user: User;
  topProfile: string;
  time = new Date();
  leftProfile: string;
  constructor(
    private absenceService: AbsenceService,
    private hoveredUserService: HoveredUserService,
    private attendanceService: AttendanceService, private themeChanger: ThemeChangerService) {
  }

  ngOnInit(): void {
    this.reloadAttendances();
  }
  reloadAttendances() {
    const format = new DateFormatter();
    for (const emp of this.users) {
      if (emp.absences != null) {
        for (const ab of emp.absences) {
          // tslint:disable-next-line:triple-equals
          if (ab.absenceDate != format.format(new Date(), 'YYYY-MM-DD', null)) {
            emp.absences.splice(emp.absences.indexOf(ab), 1);
          }
        }
      }
      this.getStatus('CHECK IN', emp);
      setTimeout(() => {
        this.getStatus('CHECK OUT', emp);
      });
    }
  }
  getTheme() {
    return this.themeChanger.getTheme();
  }

  getTime(hour: number) {
    const h = Math.floor(hour / 60);
    const m = hour % 60;
    let returnTime: string;
    returnTime = '';
    if (h < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + h.toString() + ':';
    if (m < 10) {
      returnTime = returnTime + '0';
    }
    returnTime = returnTime + m.toString();
    return returnTime;
  }

  showUserProfile(user: User, event) {
    this.topProfile = (event.relatedTarget.offsetTop + this.hoveredUserService.getPlusTop() + 200) + 'px';
    this.leftProfile = (event.target.offsetLeft + this.hoveredUserService.getClosedSideBarValue()) + 'px';
    this.hoveredUserService.setTop(this.topProfile);
    this.hoveredUserService.setLeft(this.leftProfile);
    this.user = user;
    this.hoveredUserService.setHoveredUser(user);
  }

  hideUserProfile() {
    this.user = null;
    this.hoveredUserService.setHoveredUser(null);
  }

  getStatus(type: string, emp: User) {
    const types: string[] = [];
    if (emp.absences.length > 0) {
      for (const ab of emp.absences) {
        types.push(ab.absenceType);
      }
    }
    const endHour = emp.department.planning.schedule.endHour;
    const startHour = emp.department.planning.schedule.startHour;
    const checkInDelay = emp.department.planning.planningConfigs[0].checkInDelay;
    const checkOutdelay = emp.department.planning.planningConfigs[0].checkOutDelay;
    const endCheckin = emp.department.planning.planningConfigs[0].endCheckin;
    let absentMinutes = 0;
    absentMinutes = endHour - startHour;
    if (emp.department.planning.schedule.pauseTime) {
      absentMinutes = absentMinutes - (emp.department.planning.schedule.pauseStart
        - emp.department.planning.schedule.pauseStart);
    }
    if (type === 'CHECK OUT') {
      if (emp.checkInStatus != null) {
        if (emp.checkInStatus === 'red') {
          emp.checkOutStatus = 'red';
          emp.checkOutMsg = 'Absent !';
        } else {
      for (const att of emp.attendances) {
        if (att.attendanceType === 'CHECK OUT') {

              if ((endHour - checkOutdelay) - att.attendanceTime > 0) {
                emp.checkOutStatus = 'yellow';
                emp.checkOutMsg = 'Early check-out! (checked-out at: ' + this.getTime(att.attendanceTime) + ')';
                // creating late check-in absence
                if (types.length > 0) {
                  if (types.indexOf('Early check-out') === -1 && types.indexOf('All day') === -1) {
                    this.createAbsence(emp, 'Early check-out', ((endHour - checkOutdelay) - att.attendanceTime));
                  }
                } else {
                  this.createAbsence(emp, 'Early check-out', ((endHour - checkOutdelay) - att.attendanceTime));
                }
                return;
              } else {
                emp.checkOutStatus = 'lightgreen';
                emp.checkOutMsg = 'Checked out at: ' + this.getTime(att.attendanceTime);
                return;
              }
            }
          }
      emp.checkOutStatus = 'grey';
      emp.checkOutMsg = 'Didn\'nt check-out yet';
      return;
        }
      }
      } else  {
        for (const att of emp.attendances) {
          if (att.attendanceType === 'CHECK IN') {
            if (((startHour + checkInDelay) - att.attendanceTime) >= 0) {
              emp.checkInStatus =  'lightgreen';
              emp.checkInMsg = 'checked-in at : ' + this.getTime(att.attendanceTime);
              return;
            } else if (((startHour + checkInDelay) - att.attendanceTime) < 0 && att.attendanceTime <= startHour + endCheckin) {
          emp.checkInStatus =  'yellow';
          emp.checkInMsg = 'Late check-in ! (checked-in at : ' + this.getTime(att.attendanceTime) + ')';
          // creating late check-in absence
          if (types.length > 0) {
            if (types.indexOf('Late check-in') === -1 && types.indexOf('All day') === -1) {
              this.createAbsence(emp, 'Late check-in', (att.attendanceTime - (startHour + checkInDelay)));
            }
          } else {
            this.createAbsence(emp, 'Late check-in', (att.attendanceTime - (startHour + checkInDelay)));
          }
          return;
        } else if (att.attendanceTime > endCheckin + startHour) {
            emp.checkInStatus =  'red';
            emp.checkInMsg = 'Absent ! ';
            // creating all day absence
            if (types.length > 0) {
              if (types.indexOf('All day') === -1) {
                this.createAbsence(emp, 'All day', absentMinutes);
              }
            } else {
              this.createAbsence(emp, 'All day', absentMinutes);
            }
            return;
        }
    }
        }
        if (((this.time.getMinutes() + (this.time.getHours() * 60)) > startHour + checkInDelay) &&
          (this.time.getMinutes() + (this.time.getHours() * 60)) <= (startHour + endCheckin)) {
          emp.checkInStatus =  'yellow';
          emp.checkInMsg = 'Didn\'t check in yet. Late !';
          return;
        } else if ((this.time.getMinutes() + (this.time.getHours() * 60)) > (startHour + checkInDelay)) {
          emp.checkInStatus =  'red';
          emp.checkInMsg = 'Absent ! ';
          // creating all day absence
          if (types.length > 0) {
            if (types.indexOf('All day') === -1) {
              this.createAbsence(emp, 'All day', absentMinutes);
            }
          } else {
            this.createAbsence(emp, 'All day', absentMinutes);
          }
          return;
        } else {
          emp.checkInStatus =  'grey';
          emp.checkInMsg = 'Didn\'t check-in yet ';
          return;
        }
    }
  }

  createAbsence(emp: User , type, minutes) {
    if (type === 'All day' && emp.absences.length > 0) {
      for (const ab of emp.absences) {
        this.absenceService.remove(ab.idAbsence).subscribe(() => {}, error => console.log(error));
      }
    }
    const format = new DateFormatter();
    const absent: Absence = new Absence();
    absent.user = emp;
    absent.absentMinutes = minutes;
    absent.absenceDate = format.format(new Date(), 'YYYY-MM-DD', null);
    absent.absenceType = type;
    this.absenceService.add(absent).subscribe(res => {
      emp.absences.push(absent);
      console.log(res);
    }, error => console.log(error));
  }

  calculEndCheckIn(endCheckin, startCheckIn) {
    return this.getTime(endCheckin + startCheckIn);
  }


}
