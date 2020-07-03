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
    for (const emp of this.users) {
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
    // emp.department.planning.schedule.endHour > this.time.getMinutes() + (this.time.getHours() * 60)
    if (type === 'CHECK OUT') {
      for (const att of emp.attendances) {
        if (att.attendanceType === 'CHECK OUT') {
          emp.checkOutStatus = 'lightgreen';
          emp.checkOutMsg = 'Checked out at: ' + this.getTime(att.attendanceTime);
          return;
        }
      }
      if (emp.checkInStatus != null) {
        if (emp.checkInStatus === 'red') {
          emp.checkOutStatus =  'red';
          emp.checkOutMsg = 'Absent !';
        } else {
          emp.checkOutStatus =  'grey';
          emp.checkOutMsg = 'didn\'t check-out yet';
        }
      } else {
        emp.checkOutStatus =  'grey';
        emp.checkOutMsg = 'didn\'t check-out yet';
      }
      return;
      } else  {
        for (const att of emp.attendances) {
          if (att.attendanceType === 'CHECK IN') {
            emp.checkInStatus = 'lightgreen';
            emp.checkInMsg = 'Cheked-in at ' + this.getTime(att.attendanceTime);
            return;
          }
        }
        if (emp.department.planning.schedule.startHour > this.time.getMinutes() + (this.time.getHours() * 60)) {
          emp.checkInStatus =  'grey';
          emp.checkInMsg = 'Didn\'t check-in yet ';
          return;
        } else if (emp.department.planning.schedule.startHour === this.time.getMinutes() + (this.time.getHours() * 60)) {
          emp.checkInStatus =  'yellow';
          emp.checkInMsg = 'Didn\'t check-in yet. Late ! ';
          return;
        } else {
          emp.checkInStatus =  'red';
          emp.checkInMsg = 'Absent ! ';
          // creating absence
          const format = new DateFormatter();
          if (emp.absences.length > 0) {
            // tslint:disable-next-line:triple-equals
          if (emp.absences[emp.absences.length - 1].absenceDate != format.format(new Date(), 'YYYY-MM-DD', null)) {
            this.createAbsence(emp);
          } else {
            this.checkAbsence(emp.absences[emp.absences.length - 1]);
          }
          } else {
            this.createAbsence(emp);
          }
          return;
        }
    }
  }
  checkAbsence(abs: Absence) {
    if (abs.absenceType !== 'All day') {
      abs.absenceType = 'All day';
      abs.absentMinutes = 0;
      this.absenceService.modify(abs, abs.idAbsence).subscribe(() => {}, error => console.log(error));
    }
  }
  createAbsence(emp: User) {
    const format = new DateFormatter();
    const absent: Absence = new Absence();
    absent.user = emp;
    absent.absentMinutes = 0;
    absent.absenceDate = format.format(new Date(), 'YYYY-MM-DD', null);
    absent.absenceType = 'All day';
    console.log(absent);
    this.absenceService.add(absent).subscribe(res => {
      console.log(res);
    }, error => console.log(error));
  }
}
