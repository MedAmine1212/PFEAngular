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
  @Input() attendances: Attendance[];
  showProfile: boolean;
  user: User;
  topProfile: string;

  constructor(private attendanceService: AttendanceService, private themeChanger: ThemeChangerService) {
  }

  ngOnInit(): void {
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
}
