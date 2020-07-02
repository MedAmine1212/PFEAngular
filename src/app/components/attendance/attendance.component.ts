import {Component, Input, OnInit} from '@angular/core';
import {ThemeChangerService} from '../../services/ThemeChanger/theme-changer.service';
import {AttendanceService} from '../../services/Attendance/attendance.service';
import {Attendance} from '../../models/Attendance';
import {User} from '../../models/User';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  showHideInput: boolean;
  searchText;
  @Input() users: User[];
  showProfile: boolean;
  user: User;
  topProfile: string;
  time = new Date();
  constructor(private attendanceService: AttendanceService, private themeChanger: ThemeChangerService) {
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
    this.topProfile = (event.target.offsetTop - 15) + 'px';
    this.user = user;
    this.showProfile = true;
  }

  hideUserProfile() {
    this.showProfile = false;
    this.user = null;
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
          emp.checkInMsg = 'Didn\'t check-in yey. Late ! ';
          return;
        } else {
          emp.checkInStatus =  'red';
          emp.checkInMsg = 'Absent ! ';
          // ab3th zok om l absence l zok om l back !!!
          return;
        }
    }
  }
}
