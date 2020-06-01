import { Component, OnInit } from '@angular/core';
import {Schedule} from '../../models/Schedule';
import {ScheduleService} from '../../services/schedule/schedule.service';
import {animate, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-timetables',
  animations: [
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
    )
  ],
  templateUrl: './timetables.component.html',
  styleUrls: ['./timetables.component.css'],

})
export class TimetablesComponent implements OnInit {
  hours: number[];
  days: string[];
  searchText;
  showHideInput: boolean;
  schedule: Schedule = new Schedule();
  schedule2: Schedule = new Schedule();
  schedule3: Schedule = new Schedule();
  schedule4: Schedule = new Schedule();
  schedules: Schedule[] = [];
  time = new Date();
  showSch: boolean;
  showPause: boolean;
  constructor(private  scheduleService: ScheduleService) {
    this.hours = Array(24).fill(0).map((x, i) => i);
    this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  }

  ngOnInit(): void {
    this.showHideInput = false;
    this.scheduleService.list().subscribe(list => console.log(list));

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
    this.schedule.colorIcon = 'btn btn-outline-success';
    this.schedule.pauseTime = true;
    this.schedule.pauseStart = 12;
    this.schedule.pauseEnd = 14;
    this.schedule.showSch = true;

    this.schedule2.scheduleId = 2;
    this.schedule2.scheduleName = 'Half-Time schedual';
    this.schedule2.scheduleDesc = 'Half-time work hours schedular';
    this.schedule2.startHour = 8;
    this.schedule2.endHour = 13;
    this.schedule2.scheduleDays = ['Saturday'];
    this.schedule2.repeatCycle = 1;
    this.schedule2.color = 'btn btn-info';
    this.schedule2.colorIcon = 'btn btn-outline-info';
    this.schedule2.pauseTime = false;
    this.schedule2.showSch = true;

    this.schedule3.scheduleId = 3;
    this.schedule3.scheduleName = 'Custom schedual';
    this.schedule3.scheduleDesc = 'Custom work hours schedular';
    this.schedule3.startHour = 8;
    this.schedule3.endHour = 17;
    this.schedule3.scheduleDays = ['Monday', 'Wednesday', 'Friday'];
    this.schedule3.repeatCycle = 2;
    this.schedule3.color = 'btn btn-primary';
    this.schedule3.colorIcon = 'btn btn-outline-primary';
    this.schedule3.pauseTime = true;
    this.schedule3.pauseStart = 12;
    this.schedule3.pauseEnd = 14;
    this.schedule3.showSch = false;

    this.schedule4.scheduleId = 4;
    this.schedule4.scheduleName = 'Custom2 schedual';
    this.schedule4.scheduleDesc = 'Custom2 work hours schedular';
    this.schedule4.startHour = 8;
    this.schedule4.endHour = 17;
    this.schedule4.scheduleDays = ['Tuesday', 'Thursday'];
    this.schedule4.repeatCycle = 2;
    this.schedule4.color = 'btn btn-warning';
    this.schedule4.colorIcon = 'btn btn-outline-warning';
    this.schedule4.pauseTime = false;
    this.schedule4.showSch = true;

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
    if (sch.showSch) {
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
  }

  showTip(hour: number) {
    let h: string;
    h = hour.toString();
    if (hour < 10) {
      h = '0' + h;
    }
    return h;
  }
}
