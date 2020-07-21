import {Component, Input, OnInit} from '@angular/core';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {AttendanceService} from '../../services/Attendance/attendance.service';
import {User} from '../../models/User';
import {HoveredUserService} from '../../services/hoveredUser/hovered-user.service';
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
      if (emp.attendances != null) {
        for (const att of emp.attendances) {
          // tslint:disable-next-line:triple-equals
          if (att.attendanceDate != format.format(new Date(), 'YYYY-MM-DD', null)) {
            emp.attendances.splice(emp.attendances.indexOf(att), 1);
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
    console.log(event);
    this.topProfile = (event.pageY - 110 +
      this.hoveredUserService.getPlusTop()) + 'px';
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
    const endHour = emp.department.planning.schedule.endHour;
    const startHour = emp.department.planning.schedule.startHour;
    const checkInDelay = emp.department.planning.planningConfigs[0].checkInDelay;
    const checkOutdelay = emp.department.planning.planningConfigs[0].checkOutDelay;
    const endCheckin = emp.department.planning.planningConfigs[0].endCheckin;
    const types: string[] = [];
    if (emp.absences.length > 0) {
      for (const ab of emp.absences) {
        types.push(ab.absenceType);
      }
    }
    if (type.length > 0) {
      if (types.indexOf('All day') > -1) {
        emp.checkOutStatus = 'red';
        emp.checkOutMsg = 'Absent !';
        emp.checkInStatus = 'red';
        emp.checkInMsg = 'Absent !';
        return;
      } else {
        if (types.indexOf('Early check-out') > -1) {
        let time: number;
        for (const att of emp.attendances) {
          if (att.attendanceType === 'CHECK OUT') {
            time = att.attendanceTime;
            emp.checkOutStatus = 'yellow';
            emp.checkOutMsg = 'Early check-out ! (checked-out at: ' + this.getTime(time) + ')';
            if (type === 'CHECK OUT') {
              return;
            }
            break;
          }
        }
      }
        if (types.indexOf('Late check-in') > -1) {
          let time: number;
          for (const att of emp.attendances) {
            if (att.attendanceType === 'CHECK IN') {
              time = att.attendanceTime;
              if (type === 'CHECK IN') {
                return;
              }
              break;
            }
          }
          emp.checkInStatus = 'yellow';
          emp.checkInMsg = 'Late check-in ! (checked-in at: ' + this.getTime(time) + ')';
        }
    }
    }
    if (type === 'CHECK OUT') {
      emp.checkOutStatus = 'grey';
      emp.checkOutMsg = 'Didn\'t check-out yet';
      for (const att of emp.attendances) {
        if (att.attendanceType === 'CHECK OUT') {
          emp.checkOutStatus = 'lightgreen';
          emp.checkOutMsg = 'Checked out at: ' + this.getTime(att.attendanceTime);
          return;
        }
      }
    } else {
      emp.checkInStatus = 'grey';
      emp.checkInMsg = 'Didn\'t check-in yet';
      for (const att of emp.attendances) {
        if (att.attendanceType === 'CHECK IN') {
          emp.checkInStatus = 'lightgreen';
          emp.checkInMsg = 'Checked in at: ' + this.getTime(att.attendanceTime);
          return;
        }
      }
      if (((this.time.getMinutes() + (this.time.getHours() * 60)) > startHour + checkInDelay) &&
        (this.time.getMinutes() + (this.time.getHours() * 60)) <= (startHour + endCheckin)) {
        emp.checkInStatus = 'yellow';
        emp.checkInMsg = 'Didn\'t check in yet. Late !';
        return;
      }
    }
  }

  calculEndCheckIn(endCheckin, startCheckIn) {
    return this.getTime(endCheckin + startCheckIn);
  }


}
