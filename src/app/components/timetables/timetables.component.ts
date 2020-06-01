import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/Schedule';


@Component({
  selector: 'app-timetables',
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  hours: number[];
  days: string[];
  schedule: Schedule = new Schedule();
  schedule2: Schedule = new Schedule();
  schedule3: Schedule = new Schedule();
  schedule4: Schedule = new Schedule();
  schedules: Schedule[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  constructor() {
    this.hours = Array(24).fill(0).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit(): void {
    this.showPause = false;
    this.showSch = false;
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.schedule.scheduleId = 1;
    this.schedule.scheduleName = 'Regular schedual';
    this.schedule.scheduleDesc = 'Regular work hours schedular';
    this.schedule.startHour = 8;
    this.schedule.endHour = 17;
    this.schedule.scheduleDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    this.schedule.repeatCycle = 1;
    this.schedule.color = 'btn btn-success';
    this.schedule.pauseTime = true;
    this.schedule.pauseStart = 12;
    this.schedule.pauseEnd = 14;

    this.schedule2.scheduleId = 2;
    this.schedule2.scheduleName = 'Half-Time schedual';
    this.schedule2.scheduleDesc = 'Half-time work hours schedular';
    this.schedule2.startHour = 8;
    this.schedule2.endHour = 13;
    this.schedule2.scheduleDays = ['Saturday'];
    this.schedule2.repeatCycle = 1;
    this.schedule2.color = 'btn btn-info';
    this.schedule2.pauseTime = false;

    this.schedule3.scheduleId = 3;
    this.schedule3.scheduleName = 'Custom schedual';
    this.schedule3.scheduleDesc = 'Custom work hours schedular';
    this.schedule3.startHour = 8;
    this.schedule3.endHour = 17;
    this.schedule3.scheduleDays = ['Monday', 'Wednesday', 'Friday'];
    this.schedule3.repeatCycle = 2;
    this.schedule3.color = 'btn btn-primary';
    this.schedule3.pauseTime = true;
    this.schedule3.pauseStart = 12;
    this.schedule3.pauseEnd = 14;

    this.schedule4.scheduleId = 4;
    this.schedule4.scheduleName = 'Custom2 schedual';
    this.schedule4.scheduleDesc = 'Custom2 work hours schedular';
    this.schedule4.startHour = 8;
    this.schedule4.endHour = 17;
    this.schedule4.scheduleDays = ['Tuesday', 'Thursday'];
    this.schedule4.repeatCycle = 2;
    this.schedule4.color = 'btn btn-warning';
    this.schedule4.pauseTime = false;

    this.schedules.push(this.schedule);
    this.schedules.push(this.schedule2);
    this.schedules.push(this.schedule3);
    this.schedules.push(this.schedule4);
  }

  setCliked(sch: Schedule, day: string, hour: number) {
    console.log(sch.scheduleName + ': ' + sch.scheduleDays.indexOf(day));
    console.log(day + ' ' + hour);
  }

  checkSch(sch: Schedule, day: string, hour: number) {
    this.showPause = false;
    this.showSch = false;
    if ( sch.scheduleDays.indexOf(day) > -1 && sch.startHour <= hour && sch.endHour >= hour) {
     this.showSch = true;
   }
    if (sch.pauseTime) {
      if (sch.pauseStart <= hour && sch.pauseEnd > hour) {
        this.showSch = false;
        if (sch.scheduleDays.indexOf(day) > -1) {
          this.showPause = true;
        }
      }
    }
  }

  showTip(hour: number) {
    let h: string;
    h = hour.toString();
    if (hour < 10) {
      h = '0' + h;
    }
    if (hour < 13) {
      h = h + ' AM';
    } else {
      h = h + ' PM';
    }
    return h;
  }
}
